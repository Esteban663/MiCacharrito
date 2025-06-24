import { Component, OnInit } from '@angular/core';
import { AlquilerService, Alquiler } from '../servicio/alquiler.service';
import { AuthService } from '../servicio/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancelar-alquiler',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cancelar-alquiler.component.html',
  styleUrls: ['./cancelar-alquiler.component.css']
})
export class CancelarAlquilerComponent implements OnInit {
  alquileresActivos: Alquiler[] = [];
  usuarioIdentificacion: string = '';
  cargando: boolean = false;
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | 'info' = 'info';
  mostrarFormularioBusqueda: boolean = false;

  constructor(
    private alquilerService: AlquilerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Verificar si hay un usuario autenticado
    const usuarioActual = this.authService.getUsuarioActual();
    
    if (usuarioActual) {
      // Si hay usuario autenticado, usar su identificación
      this.usuarioIdentificacion = usuarioActual.identificacion;
      this.mostrarFormularioBusqueda = false;
      this.cargarAlquileresActivos();
    } else {
      // Si no hay usuario autenticado, mostrar formulario de búsqueda
      this.mostrarFormularioBusqueda = true;
      this.mostrarMensaje('Por favor, ingresa tu número de identificación para buscar tus alquileres', 'info');
    }
  }

  // Método para buscar alquileres por identificación (para casos sin autenticación)
  buscarAlquileresPorId(): void {
    if (!this.usuarioIdentificacion.trim()) {
      this.mostrarMensaje('Por favor ingresa tu número de identificación', 'error');
      return;
    }
    
    this.mostrarFormularioBusqueda = false;
    this.cargarAlquileresActivos();
  }

  cargarAlquileresActivos(): void {
    if (!this.usuarioIdentificacion) {
      this.mostrarMensaje('No se ha encontrado un usuario autenticado', 'error');
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    
    this.alquilerService.obtenerAlquileresActivos(this.usuarioIdentificacion)
      .subscribe({
        next: (alquileres) => {
          this.alquileresActivos = alquileres;
          this.cargando = false;
          if (alquileres.length === 0) {
            this.mostrarMensaje('No tienes alquileres activos para cancelar', 'info');
          } else {
            this.mostrarMensaje(`Se encontraron ${alquileres.length} alquiler(es) activo(s)`, 'success');
          }
        },
        error: (error) => {
          console.error('Error al cargar alquileres:', error);
          this.mostrarMensaje('Error al cargar los alquileres activos. Verifica tu número de identificación.', 'error');
          this.cargando = false;
        }
      });
  }

  cancelarAlquiler(alquiler: Alquiler): void {
    if (alquiler.estado !== 'pendiente de entrega') {
      this.mostrarMensaje('Solo se pueden cancelar alquileres pendientes de entrega', 'error');
      return;
    }

    const confirmMessage = `¿Estás seguro de que deseas cancelar el alquiler #${alquiler.numero_alquiler}?\n\n` +
                          `Vehículo: ${alquiler.vehiculo?.tipo} - Placa: ${alquiler.vehiculo?.placa}\n` +
                          `Valor: $${alquiler.valor_total?.toLocaleString('es-CO')}`;

    if (confirm(confirmMessage)) {
      this.cargando = true;
      
      this.alquilerService.cancelarAlquiler(alquiler.numero_alquiler)
        .subscribe({
          next: (response) => {
            this.mostrarMensaje(`Alquiler #${alquiler.numero_alquiler} cancelado exitosamente. El vehículo ya está disponible nuevamente.`, 'success');
            this.cargarAlquileresActivos();
            this.cargando = false;
          },
          error: (error) => {
            console.error('Error al cancelar alquiler:', error);
            let mensajeError = 'Error al cancelar el alquiler. Inténtalo de nuevo.';
            
            if (error.status === 404) {
              mensajeError = 'Alquiler no encontrado.';
            } else if (error.status === 400) {
              mensajeError = error.error || 'No se puede cancelar este alquiler.';
            }
            
            this.mostrarMensaje(mensajeError, 'error');
            this.cargando = false;
          }
        });
    }
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'error' | 'info'): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    
    setTimeout(() => {
      this.mensaje = '';
    }, 7000);
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  nuevaBusqueda(): void {
    this.mostrarFormularioBusqueda = true;
    this.usuarioIdentificacion = '';
    this.alquileresActivos = [];
    this.mensaje = '';
  }

  calcularDiasRestantes(fechaEntrega: string): number {
    const hoy = new Date();
    const entrega = new Date(fechaEntrega);
    const diferencia = entrega.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }

  obtenerColorEstado(fechaEntrega: string): string {
    const dias = this.calcularDiasRestantes(fechaEntrega);
    if (dias < 0) return 'bg-danger';
    if (dias <= 1) return 'bg-warning';
    return 'bg-success';
  }

  // Método para volver al dashboard o página anterior
  volverAlDashboard(): void {
    this.router.navigate(['/lista-vehiculos']); // Ajusta la ruta según tu aplicación
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login-usuario']);
  }
}