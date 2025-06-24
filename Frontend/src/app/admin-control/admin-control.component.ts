import { Component } from '@angular/core';
import { Alquiler } from '../servicio/alquiler.service';
import { AdminService } from '../servicio/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Vehiculo } from '../entities/vehiculo';
import { VehiculoService } from '../servicio/vehiculo.service';

@Component({
  selector: 'app-admin-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-control.component.html',
  styleUrl: './admin-control.component.css'
})
export class AdminControlComponent {
  alquileresPendientes: Alquiler[] = [];
    cargando: boolean = false;
    mensaje: string = '';
    tipoMensaje: 'success' | 'error' | 'info' = 'info';
    
    // Para el filtro
    tipoVehiculoSeleccionado: string = '';
    tiposVehiculos: string[] = ['automovil', 'camioneta', 'campero', 'microbus', 'motocicleta'];
    constructor(
      private vehiculoService: VehiculoService,
      private adminService: AdminService
    ) { }
  
    ngOnInit(): void {
      this.cargarAlquileresPendientes();
    }
  
    cargarAlquileresPendientes(): void {
      this.cargando = true;
      this.adminService.obtenerAlquileresPendientesEntrega()
        .subscribe({
          next: (alquileres) => {
            this.alquileresPendientes = alquileres;
            this.cargando = false;
            if (alquileres.length === 0) {
              this.mostrarMensaje('No hay alquileres pendientes de entrega', 'info');
            }
          },
          error: (error) => {
            console.error('Error al cargar alquileres pendientes:', error);
            this.mostrarMensaje('Error al cargar los alquileres pendientes', 'error');
            this.cargando = false;
          }
        });
    }
  
    filtrarPorTipo(): void {
      if (!this.tipoVehiculoSeleccionado) {
        this.cargarAlquileresPendientes();
        return;
      }
  
      this.cargando = true;
      this.adminService.obtenerAlquileresPendientesPorTipo(this.tipoVehiculoSeleccionado)
        .subscribe({
          next: (alquileres) => {
            this.alquileresPendientes = alquileres;
            this.cargando = false;
            if (alquileres.length === 0) {
              this.mostrarMensaje(`No hay alquileres pendientes de ${this.tipoVehiculoSeleccionado}`, 'info');
            }
          },
          error: (error) => {
            console.error('Error al filtrar alquileres:', error);
            this.mostrarMensaje('Error al filtrar los alquileres', 'error');
            this.cargando = false;
          }
        });
    }
  
    limpiarFiltro(): void {
      this.tipoVehiculoSeleccionado = '';
      this.cargarAlquileresPendientes();
    }
  
    mostrarMensaje(texto: string, tipo: 'success' | 'error' | 'info'): void {
      this.mensaje = texto;
      this.tipoMensaje = tipo;
      
      setTimeout(() => {
        this.mensaje = '';
      }, 5000);
    }
  
    formatearFecha(fecha: Date): string {
      return new Date(fecha).toLocaleDateString('es-CO');
    }

    entregarVehiculo(alquiler: Alquiler): void {
      alquiler.estado = 'Entregado'; // Cambiar el estado del alquiler a 'Entregado'
      this.adminService.entregarVehiculo(alquiler).subscribe({
        next: (resp) => {
          this.mostrarMensaje('Vehículo entregado exitosamente', 'success');
          this.cargarAlquileresPendientes(); // Recargar la lista de alquileres pendientes
        },
        error: (err) => {
          console.error('Error al entregar el vehículo:', err);
          this.mostrarMensaje('Error al entregar el vehículo', 'error');
        }
      });
    }



    

}
