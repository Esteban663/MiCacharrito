import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService, UsuarioAutenticado } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginUsuarioService {
  private apiUrl = 'http://localhost:8080/ver';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  login(identificacion: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/iniciarSesion`, {
      identificacion: identificacion,
      password: password
    }, { responseType: 'text' }).pipe(
      tap(response => {
        // Si el login es exitoso, buscar los datos completos del usuario
        if (response === 'Inicio de sesión exitoso') {
          this.obtenerDatosUsuario(identificacion).subscribe({
            next: (usuario) => {
              // Establecer el usuario en el servicio de autenticación
              this.authService.setUsuarioActual(usuario);
            },
            error: (error) => {
              console.error('Error al obtener datos del usuario:', error);
            }
          });
        }
      })
    );
  }

  // Método para obtener los datos completos del usuario
  private obtenerDatosUsuario(identificacion: string): Observable<UsuarioAutenticado> {
    return this.httpClient.get<UsuarioAutenticado>(`${this.apiUrl}/BuscarUsuario?id_usu=${identificacion}`);
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.cerrarSesion();
  }
}