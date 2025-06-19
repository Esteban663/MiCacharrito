import { VehiculoService } from './../servicio/vehiculo.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Vehiculo } from '../entities/vehiculo';
import { Alquiler } from '../entities/alquiler'; // Adjust the path if your Alquiler class is elsewhere
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-vehiculos.component.html',
  styleUrl: './lista-vehiculos.component.css'
})
export class ListaVehiculosComponent {
  alquiler: Alquiler = new Alquiler();
  
  vehiculo: Vehiculo[];
  vehiculoSeleccionado: Vehiculo;
  mostrarModal: boolean;

  ngOnInit(): void {
    this.verVehiculos();
   
  }
  constructor(private vehiculoService: VehiculoService) {
      this.vehiculo = [];
    }

private verVehiculos() {
  this.vehiculoService.obtenerListaVehiculos().subscribe(
    (dato: Vehiculo[]) => {
      this.vehiculo = dato.filter(v => v.estado === 'Disponible');
    }
  );
}

  alquilarVehiculo(car: Vehiculo, alquiler: Alquiler) {
    const fechaInicio = new Date(alquiler.fecha_inicio);
    const fechaFin = new Date(alquiler.fecha_entrega);
    const diffTime = Math.abs(fechaFin.getTime() - fechaInicio.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    alquiler.valor_total = diffDays * car.valor_alquiler;
    alquiler.vehiculo = car;
    car.estado = 'Alquilado';
    this.vehiculo = this.vehiculo.filter(v => v.placa !== car.placa);
    this.vehiculoService.actualizarVehiculo(car).subscribe(dato => {
      console.log(dato);
      if (dato != null) {
        alert('Vehículo alquilado exitosamente y actualizado en la base de datos');
        // Eliminar el vehículo alquilado de la lista actual sin recargar toda la lista
        
      } else {
        alert('Error al actualizar el estado del vehículo en la base de datos');
      }
    });
    this.confirmarAlquiler(alquiler);
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
  confirmarAlquiler(alquiler: Alquiler) {

    
    this.vehiculoService.alquilarVehiculo(alquiler).subscribe(dato => {
      if (dato != null) {
        alert('Vehículo alquilado exitosamente');
      } else {
        alert('Error al alquilar el vehículo');
      }
    });
    this.mostrarModal = false;
  }

  seleccionarVehiculo(vehiculo: Vehiculo) {
    this.vehiculoSeleccionado = vehiculo;
    this.abrirModal();
  }

}
