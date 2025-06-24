import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { PendientesEntregaComponent } from './pendientes-entrega/pendientes-entrega.component';
import { ConsultarVehiculoAdminComponent } from './consultar-vehiculo-admin/consultar-vehiculo-admin.component';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';
import { CancelarAlquilerComponent } from './cancelar-alquiler/cancelar-alquiler.component';

export const routes: Routes = [
    {path: 'login-usuario', component: LoginUsuarioComponent},
    {path: 'usuario', component: UsuarioComponent},
    {path: 'pendientes-entrega',component: PendientesEntregaComponent},
    { path: 'consultar-vehiculo-admin', component: ConsultarVehiculoAdminComponent },
    {path: 'login-admin', component: LoginAdminComponent },
    {path: 'admin-control', component: AdminControlComponent },
    {path: 'pendientes-entrega',component: PendientesEntregaComponent},
    {path: 'lista-vehiculos', component: ListaVehiculosComponent},
    { path: 'cancelar-alquiler', component: CancelarAlquilerComponent },

];
