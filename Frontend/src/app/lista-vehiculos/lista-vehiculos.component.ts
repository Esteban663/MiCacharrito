import { VehiculoService } from './../servicio/vehiculo.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Vehiculo } from '../entities/vehiculo';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './lista-vehiculos.component.html',
  styleUrl: './lista-vehiculos.component.css'
})
export class ListaVehiculosComponent {
  vehiculo: Vehiculo[];
  vehiculosFiltrados: Vehiculo[] = []; 
  cargando: boolean = false;
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | 'info' = 'info';
  tipoVehiculoSeleccionado: string = '';
  tiposVehiculos: string[] = ['Automovil', 'Camioneta', 'Campero', 'Microbus', 'Motocicleta'];


  ngOnInit(): void {
    this.tiposVehiculos = this.tiposVehiculos.map(
    tipo => tipo.charAt(0).toUpperCase() + tipo.slice(1)
  );
    this.verVehiculos();
   
  }
 
     constructor(
    private vehiculoService: VehiculoService,
    private router: Router // Inyección del Router
  ) {
      this.vehiculo = [];

    }
    
    verVehiculos() {
    this.cargando = true;
    this.vehiculoService.obtenerListaVehiculos().subscribe(
      (dato: Vehiculo[]) => {
        this.vehiculo = dato.filter(v => v.estado === 'Disponible');
        this.vehiculosFiltrados = [...this.vehiculo];
        this.cargando = false;
      },
      error => {
        this.mostrarMensaje('Error al cargar los vehículos', 'error');
        this.cargando = false;
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
    
 filtarPorTipo(): void {
    if (!this.tipoVehiculoSeleccionado) {
      this.vehiculosFiltrados = [...this.vehiculo];
      return;
    }
    this.vehiculosFiltrados = this.vehiculo.filter(
      v => v.tipo === this.tipoVehiculoSeleccionado
    );
    if (this.vehiculosFiltrados.length === 0) {
      this.mostrarMensaje(`No hay vehículos disponibles de tipo ${this.tipoVehiculoSeleccionado}`, 'info');
    }
  }

  limpiarFiltro(): void {
    this.tipoVehiculoSeleccionado = '';
    this.vehiculosFiltrados = [...this.vehiculo];
  }

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error' | 'info'): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;

    }

    irACancelarAlquiler() {
      this.router.navigate(['/cancelar-alquiler']);
}
}

