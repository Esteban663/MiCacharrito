import { Component } from '@angular/core';
import { Alquiler } from '../servicio/alquiler.service';
import { AdminService } from '../servicio/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Vehiculo } from '../entities/vehiculo';
import { Router } from '@angular/router';
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
  tiposVehiculos: string[] = ['Automovil', 'Camioneta', 'Campero', 'Microbus', 'Motocicleta'];

  //Para Recibir Vehiculo
  busquedaAlquiler: string = '';
  alquilerEncontrado: any = null;
  fechaRealDevolucion: string = '';
  cobroAdicional: number = 0;
  mensajeC: string = '';
  exito: boolean = false;

 


  constructor(private adminService: AdminService, private router: Router, private vehiculoService: VehiculoService,) { }

  ngOnInit(): void {
    this.cargarAlquileresPendientes();
  }
  
  cargarAlquileresPendientes(): void {
  this.cargando = true;
  this.adminService.obtenerAlquileresPendientesEntrega()
    .subscribe({
      next: (alquileres: Alquiler[]) => {
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

consultarAlquiler() {
  if (!this.busquedaAlquiler) {
    this.mensajeC = 'Ingrese número de alquiler o placa.';
    this.exito = false;
    return;
  }

  // Si es un número, busca por id_alquiler
  if (!isNaN(Number(this.busquedaAlquiler))) {
    console.log('Buscando alquiler:', this.busquedaAlquiler);
    this.adminService.BuscarAlquilerPorId(Number(this.busquedaAlquiler)).subscribe({
      next: (alquiler) => {
        console.log('Respuesta alquiler:', alquiler);
        this.alquilerEncontrado = alquiler;
        this.mensajeC = '';
        this.fechaRealDevolucion = '';
        this.cobroAdicional = 0;
        this.exito = true;
      },
      error: () => {
        this.alquilerEncontrado = null;
        this.mensajeC = 'No se encontró el alquiler por ID.';
        this.exito = false;
      }
    });
  } else {
    // Si no es número, busca por placa
    console.log('Buscando alquiler:', this.busquedaAlquiler);
    this.adminService.BuscarAlquilerPorVehiculo(this.busquedaAlquiler).subscribe({
      next: (alquiler) => {
        console.log('Respuesta alquiler:', alquiler);
        this.alquilerEncontrado = alquiler;
        this.mensajeC = '';
        this.fechaRealDevolucion = '';
        this.cobroAdicional = 0;
        this.exito = true;
      },
      error: () => {
        this.alquilerEncontrado = null;
        this.mensajeC = 'No se encontró el alquiler por placa.';
        this.exito = false;
      }
    });
  }
}

  finalizarDevolucion() {
  if (!this.fechaRealDevolucion) {
    this.mensajeC = 'Debe ingresar la fecha real de devolución.';
    this.exito = false;
    return;
  }
  const fechaLimite = new Date(this.alquilerEncontrado.fecha_entrega);
  const fechaReal = new Date(this.fechaRealDevolucion);
  if (fechaReal > fechaLimite) {
    const diasRetraso = Math.ceil((fechaReal.getTime() - fechaLimite.getTime()) / (1000 * 3600 * 24));
    this.cobroAdicional = diasRetraso * 50000; // Ejemplo: $50.000 por día de retraso
  } else {
    this.cobroAdicional = 0;
  }
  // Llama al servicio para registrar la devolución
  console.log({
  numeroAlquiler: this.alquilerEncontrado.numero_alquiler,
  fechaReal: this.fechaRealDevolucion,
  cobroAdicional: this.cobroAdicional
});
  this.adminService.RegistrarDevolucion({
    numeroAlquiler: this.alquilerEncontrado.numero_alquiler,
    fechaReal: this.fechaRealDevolucion,
    cobroAdicional: this.cobroAdicional
  }).subscribe({
    next: () => {
      this.mensajeC = 'Devolución registrada correctamente.';
      this.exito = true;
      this.alquilerEncontrado.estado = 'devuelto';
      // Aquí puedes limpiar campos o actualizar arrays si lo necesitas
    },
    error: (err) => {
      console.error('Error detalle al registrar devolución:', err); // <-- Agrega esto
      this.mensajeC = 'Error al registrar la devolución.';
      this.exito = false;
    }
  });
}

irAConsultarVehiculo() {
  this.router.navigate(['/consultar-vehiculo-admin']);

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

    

