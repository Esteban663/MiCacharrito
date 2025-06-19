import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { CancelarAlquilerComponent } from "./cancelar-alquiler/cancelar-alquiler.component";
import { PendientesEntregaComponent } from "./pendientes-entrega/pendientes-entrega.component";

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, NavegacionComponent, LoginUsuarioComponent, AdminControlComponent, CancelarAlquilerComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'micacharrito-frontend';
}
