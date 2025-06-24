import { Component, OnInit } from '@angular/core';
import { AdminService } from '../servicio/admin.service';
import { Alquiler } from '../servicio/alquiler.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pendientes-entrega',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './pendientes-entrega.component.html',
  styleUrls: ['./pendientes-entrega.component.css']
})
export class PendientesEntregaComponent implements OnInit {
  alquileresPendientes: Alquiler[] = [];
  cargando: boolean = false;
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | 'info' = 'info';
  
  // Para el filtro
  tipoVehiculoSeleccionado: string = '';
  tiposVehiculos: string[] = ['automovil', 'camioneta', 'campero', 'microbus', 'motocicleta'];

  constructor(private adminService: AdminService) {}

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

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-CO');
  }
}