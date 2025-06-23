import { Component, OnInit } from '@angular/core';
import { AlquilerService, Alquiler } from '../servicio/alquiler.service';
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
  mostrarFormularioBusqueda: boolean = true;

  constructor(private alquilerService: AlquilerService) { }

  ngOnInit(): void {
    // OPCIÓN 1: Identificación fija para pruebas:
    // Usuarios disponibles para pruebas:
    // - "1056432123" (Mateo Quintero) - tiene 1 alquiler cancelado
    // - "1076542123" (Lucho Perez) - tiene 1 alquiler que se canceló mediante el navegador y los metodos actualizados
    // - "987" (Manuel Perez) - tiene 1 alquiler que se canceló mediante el navegador y los metodos actualizados
    
    // Descomenta una de estas líneas para probar:
     this.usuarioIdentificacion = '1076542123'; // Lucho Perez
     this.usuarioIdentificacion = '987'; // Manuel Perez
    
    
    // OPCIÓN 3: Si implementas autenticación más adelante
    // this.usuarioIdentificacion = this.authService.getUsuarioActual().identificacion;
    // this.usuarioIdentificacion = localStorage.getItem('usuarioIdentificacion') || '';
    
    // Si ya tienes la identificación, cargar alquileres automáticamente
    if (this.usuarioIdentificacion) {
      this.mostrarFormularioBusqueda = false;
      this.cargarAlquileresActivos();
    }
  }

  // Método para buscar alquileres por identificación (para pruebas)
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
    this.mensaje = ''; // Limpiar mensajes anteriores
    
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
    // Validación adicional del estado
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
            this.cargarAlquileresActivos(); // Recargar la lista
            this.cargando = false;
          },
          error: (error) => {
            console.error('Error al cancelar alquiler:', error);
            let mensajeError = 'Error al cancelar el alquiler. Inténtalo de nuevo.';
            
            // Manejar diferentes tipos de errores
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
    
    // Limpiar el mensaje después de 7 segundos para mensajes largos
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

  // Método para volver al formulario de búsqueda
  nuevaBusqueda(): void {
    this.mostrarFormularioBusqueda = true;
    this.usuarioIdentificacion = '';
    this.alquileresActivos = [];
    this.mensaje = '';
  }

  // Método para calcular días restantes hasta la entrega
  calcularDiasRestantes(fechaEntrega: string): number {
    const hoy = new Date();
    const entrega = new Date(fechaEntrega);
    const diferencia = entrega.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }

  // Método para obtener el color del badge según los días restantes
  obtenerColorEstado(fechaEntrega: string): string {
    const dias = this.calcularDiasRestantes(fechaEntrega);
    if (dias < 0) return 'bg-danger'; // Vencido
    if (dias <= 1) return 'bg-warning'; // Próximo a vencer
    return 'bg-success'; // Normal
  }
}