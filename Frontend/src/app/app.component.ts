import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { CancelarAlquilerComponent } from "./cancelar-alquiler/cancelar-alquiler.component";
import { PendientesEntregaComponent } from "./pendientes-entrega/pendientes-entrega.component";
import { ConsultarVehiculoAdminComponent } from "./consultar-vehiculo-admin/consultar-vehiculo-admin.component";


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, LoginUsuarioComponent,AdminControlComponent, CancelarAlquilerComponent, PendientesEntregaComponent, ConsultarVehiculoAdminComponent],


  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'micacharrito-frontend';
}
