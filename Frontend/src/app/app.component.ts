import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
<<<<<<< HEAD
import { ListaVehiculosComponent } from "./lista-vehiculos/lista-vehiculos.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
=======
import { AdminControlComponent } from './admin-control/admin-control.component';
import { CancelarAlquilerComponent } from "./cancelar-alquiler/cancelar-alquiler.component";
import { PendientesEntregaComponent } from "./pendientes-entrega/pendientes-entrega.component";
import { ListaVehiculosComponent } from "./lista-vehiculos/lista-vehiculos.component";

>>>>>>> 76e5cd7680e444584eda9f41f3a756a136938a96

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, NavegacionComponent, LoginUsuarioComponent, ListaVehiculosComponent, CommonModule, FormsModule,],
=======
  imports: [RouterOutlet, NavegacionComponent, LoginUsuarioComponent, AdminControlComponent, CancelarAlquilerComponent, ListaVehiculosComponent],
>>>>>>> 76e5cd7680e444584eda9f41f3a756a136938a96
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'micacharrito-frontend';
}
