import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';

export const routes: Routes = [
    {path: 'login-usuario', component: LoginUsuarioComponent},
    {path: 'usuario', component: UsuarioComponent},
    {path: 'lista-vehiculos', component: ListaVehiculosComponent}
];
