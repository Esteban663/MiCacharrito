import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { ListaVehiculosComponent } from "./lista-vehiculos/lista-vehiculos.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AdminControlComponent } from './admin-control/admin-control.component';
import { CancelarAlquilerComponent } from './cancelar-alquiler/cancelar-alquiler.component';
import { RegistroUsuarioComponent } from "./registro-usuario/registro-usuario.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegacionComponent, LoginUsuarioComponent, AdminControlComponent, CancelarAlquilerComponent, ListaVehiculosComponent, RegistroUsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'micacharrito-frontend';
}
