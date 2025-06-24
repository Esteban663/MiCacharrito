import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UsuarioAutenticado {
  identificacion: string;
  nombre_completo: string;
  correo_electronico: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActualSubject = new BehaviorSubject<UsuarioAutenticado | null>(null);
  public usuarioActual$ = this.usuarioActualSubject.asObservable();

  constructor() {
    // Verificar si hay un usuario guardado en memoria al inicializar el servicio
    this.verificarSesionExistente();
  }

  private verificarSesionExistente(): void {
    // Aquí podrías verificar si hay una sesión activa
    // Por ahora solo inicializamos como null
    this.usuarioActualSubject.next(null);
  }

  // Método para establecer el usuario después del login exitoso
  setUsuarioActual(usuario: UsuarioAutenticado): void {
    this.usuarioActualSubject.next(usuario);
  }

  // Método para obtener el usuario actual
  getUsuarioActual(): UsuarioAutenticado | null {
    return this.usuarioActualSubject.value;
  }

  // Método para obtener la identificación del usuario actual
  getIdentificacionUsuarioActual(): string | null {
    const usuario = this.getUsuarioActual();
    return usuario ? usuario.identificacion : null;
  }

  // Método para verificar si hay un usuario autenticado
  estaAutenticado(): boolean {
    return this.getUsuarioActual() !== null;
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    this.usuarioActualSubject.next(null);
  }

  // Observable para verificar el estado de autenticación
  get estaAutenticado$(): Observable<boolean> {
    return new Observable(observer => {
      this.usuarioActual$.subscribe(usuario => {
        observer.next(usuario !== null);
      });
    });
  }
}