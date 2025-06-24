import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {

  constructor(private httpClient: HttpClient) { }

 loginAdmin(usuario: string, password: string): Observable<any> {
   return this.httpClient.post('http://localhost:8080/ver/iniciarSesionAdmin', {
     usuario: usuario,
     password: password
   }, { responseType: 'text' });
 
 }
}
