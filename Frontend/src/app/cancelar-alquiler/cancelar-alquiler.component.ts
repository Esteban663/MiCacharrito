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
  usuarioIdentificacion: string = ''; // Esto debe venir del servicio de autenticación
  cargando: boolean = false;
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | 'info' = 'info';

  constructor(private alquilerService: AlquilerService) { }

  ngOnInit(): void {
    // Aquí deberías obtener la identificación del usuario logueado
    // Por ejemplo: this.usuarioIdentificacion = this.authService.getUsuarioActual().identificacion;
    this.cargarAlquileresActivos();
  }

  cargarAlquileresActivos(): void {
    if (!this.usuarioIdentificacion) {
      this.mostrarMensaje('No se ha encontrado un usuario autenticado', 'error');
      return;
    }

    this.cargando = true;
    this.alquilerService.obtenerAlquileresActivos(this.usuarioIdentificacion)
      .subscribe({
        next: (alquileres) => {
          this.alquileresActivos = alquileres;
          this.cargando = false;
          if (alquileres.length === 0) {
            this.mostrarMensaje('No tienes alquileres activos para cancelar', 'info');
          }
        },
        error: (error) => {
          console.error('Error al cargar alquileres:', error);
          this.mostrarMensaje('Error al cargar los alquileres activos', 'error');
          this.cargando = false;
        }
      });
  }

  cancelarAlquiler(alquiler: Alquiler): void {
    if (confirm(`¿Estás seguro de que deseas cancelar el alquiler #${alquiler.numero_alquiler}?`)) {
      this.cargando = true;
      
      this.alquilerService.cancelarAlquiler(alquiler.numero_alquiler)
        .subscribe({
          next: (response) => {
            this.mostrarMensaje('Alquiler cancelado exitosamente', 'success');
            this.cargarAlquileresActivos(); // Recargar la lista
            this.cargando = false;
          },
          error: (error) => {
            console.error('Error al cancelar alquiler:', error);
            this.mostrarMensaje('Error al cancelar el alquiler. Inténtalo de nuevo.', 'error');
            this.cargando = false;
          }
        });
    }
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'error' | 'info'): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    
    // Limpiar el mensaje después de 5 segundos
    setTimeout(() => {
      this.mensaje = '';
    }, 5000);
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-CO');
  }
}