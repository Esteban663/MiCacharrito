import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entities/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   private bdURL = "http://localhost:8080/ver/Usuarios"; 
  constructor(private httpClient: HttpClient) { 

  }

  obtenerListaUsuarios(): Observable<Usuario[]> {

    return this.httpClient.get<Usuario[]>(`${this.bdURL}`);
  }

}
