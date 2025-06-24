import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculoConsultaAdminService, Vehiculo } from '../servicio/vehiculo-consulta-admin.service';

@Component({
  selector: 'app-consultar-vehiculo-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-vehiculo-admin.component.html',
  styleUrl: './consultar-vehiculo-admin.component.css'
})
export class ConsultarVehiculoAdminComponent {
  tipoSeleccionado: string = '';
  vehiculosDisponibles: Vehiculo[] = [];
  cargando: boolean = false;
  mensaje: string = '';
  
  // Tipos de vehículos según los requerimientos
  tiposVehiculos: string[] = [
    'Automovil',
    'Camioneta', 
    'Campero',
    'Microbus',
    'Motocicleta'
  ];

  constructor(private vehiculoService: VehiculoConsultaAdminService) { }

  // Método para consultar vehículos por tipo
  consultarVehiculos(): void {
    if (!this.tipoSeleccionado) {
      this.mensaje = 'Por favor seleccione un tipo de vehículo';
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    this.vehiculosDisponibles = [];

    this.vehiculoService.buscarVehiculosPorTipo(this.tipoSeleccionado).subscribe({
      next: (vehiculos) => {
        this.vehiculosDisponibles = vehiculos;
        this.cargando = false;
        
        if (vehiculos.length === 0) {
          this.mensaje = `No hay vehículos disponibles del tipo: ${this.tipoSeleccionado}`;
        }
      },
      error: (error) => {
        console.error('Error al consultar vehículos:', error);
        this.cargando = false;
        this.mensaje = 'Error al consultar los vehículos. Intente nuevamente.';
      }
    });
  }

  // Método para limpiar la consulta
  limpiarConsulta(): void {
    this.tipoSeleccionado = '';
    this.vehiculosDisponibles = [];
    this.mensaje = '';
  }
}