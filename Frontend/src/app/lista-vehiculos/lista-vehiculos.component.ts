import { VehiculoService } from './../servicio/vehiculo.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Vehiculo } from '../entities/vehiculo';
import { Alquiler } from '../entities/alquiler'; // Adjust the path if your Alquiler class is elsewhere
import { FormsModule } from '@angular/forms';
import { Usuario } from '../entities/usuario';

@Component({
  selector: 'app-lista-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-vehiculos.component.html',
  styleUrl: './lista-vehiculos.component.css'
})
export class ListaVehiculosComponent {
  alquiler: Alquiler = new Alquiler();
  identificacionGuardada = localStorage.getItem('identificacionUsuario');

  vehiculo: Vehiculo[];
  vehiculoSeleccionado: Vehiculo;
  mostrarModal: boolean;
  localStorage: Storage;

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
    if (!this.identificacionGuardada) {
      alert('Debes iniciar sesión para alquilar un vehículo');
      return;
    }

    // Crear el usuario con el id de identificacionUsuario
    const usuario: Usuario = new Usuario();
    usuario.identificacion = this.identificacionGuardada;

    // Asignar el usuario al alquiler
    alquiler.usuario = usuario;

    const alquilerData = {
      vehiculoId: car.placa,
      usuarioId: this.identificacionGuardada,
      // agrega otros campos si es necesario
    }
      
    const fechaInicio = new Date(alquiler.fecha_inicio);
    const fechaFin = new Date(alquiler.fecha_entrega);
    const diffTime = Math.abs(fechaFin.getTime() - fechaInicio.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    alquiler.valor_total = diffDays * car.valor_alquiler;
    alquiler.vehiculo = car;
    alquiler.usuario = usuario;
    alquiler.estado = 'Pendiente de entrega';
    car.estado = 'Alquilado';
    this.vehiculo = this.vehiculo.filter(v => v.placa !== car.placa);
    this.vehiculoService.actualizarVehiculo(car).subscribe(dato => {
      console.log(dato);
      console.log(usuario)
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

    console.log(alquiler);

    this.vehiculoService.alquilarVehiculo(alquiler).subscribe(dato => {
      console.log(dato);
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
