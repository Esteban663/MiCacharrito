import { VehiculoService } from './../servicio/vehiculo.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Vehiculo } from '../entities/vehiculo';

@Component({
  selector: 'app-lista-vehiculos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-vehiculos.component.html',
  styleUrl: './lista-vehiculos.component.css'
})
export class ListaVehiculosComponent {
  vehiculo: Vehiculo[];

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

  alquilarVehiculo(car: Vehiculo) {
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
  }



}
