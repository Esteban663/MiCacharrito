import { VehiculoService } from './../servicio/vehiculo.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Vehiculo } from '../entities/vehiculo';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Alquiler } from '../entities/alquiler'; // Adjust the path if your Alquiler class is elsewhere
import { Usuario } from '../entities/usuario';
import { generarPDFDeAlquiler } from '../lib/pdf'; 



@Component({
  selector: 'app-lista-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule ],
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

  onGeneratePDF(alquiler: Alquiler): void {
    const fecha = new Date();
    generarPDFDeAlquiler(alquiler, fecha);
    this.mostrarMensaje('PDF generado exitosamente', 'success');
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

