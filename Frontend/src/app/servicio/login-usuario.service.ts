import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUsuarioService {
  /*
  private BdURLD = "http://localhost:8080/ver/iniciarSesion";
 

   login(usuario: string, contra: string): Observable<any> {
    return this.httpClient.post(this.BdURLD, { usuario, contra });
  }
    
    */
    constructor(private httpClient: HttpClient) { }
login(identificacion: string, password: string): Observable<any> {
  return this.httpClient.post('http://localhost:8080/ver/iniciarSesion', {
    identificacion: identificacion,
    password: password
  }, { responseType: 'text' }).pipe(
    tap((response: string) => {
      console.log('Login exitoso:', response);
    })
  );
}

}

