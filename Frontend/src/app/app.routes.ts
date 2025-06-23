import { Routes } from '@angular/router';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { PendientesEntregaComponent } from './pendientes-entrega/pendientes-entrega.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
// ...existing code...

export const routes: Routes = [
    { path: 'usuario', component: UsuarioComponent },
    { path: 'login-admin', component: LoginAdminComponent },
    { path: 'admin-control', component: AdminControlComponent },
    { path: 'pendientes-entrega', component: PendientesEntregaComponent },
    { path: 'lista-vehiculos', component: ListaVehiculosComponent },
    { path: 'registro-usuario', component: RegistroUsuarioComponent },
    { path: 'login-usuario', component: LoginUsuarioComponent } // <-- Agrega esta línea
];

