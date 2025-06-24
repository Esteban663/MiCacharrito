import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alquiler } from './alquiler.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/ver';

  constructor(private http: HttpClient) { }

  // Obtener alquileres pendientes de entrega
  obtenerAlquileresPendientesEntrega(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(`${this.apiUrl}/AlquileresPendientesEntrega`);
  }

  // Obtener alquileres pendientes filtrados por tipo de vehículo 
  obtenerAlquileresPendientesPorTipo(tipoVehiculo: string): Observable<Alquiler[]> {
    const params = new HttpParams().set('tipoVehiculo', tipoVehiculo);
    return this.http.get<Alquiler[]>(`${this.apiUrl}/AlquileresPendientesEntregaPorTipo`, { params });
  }

  // Busca Alquiler Por vehiculo
  BuscarAlquilerPorVehiculo(placa: string): Observable<Alquiler[]> {
  return this.http.get<Alquiler[]>(`${this.apiUrl}/BuscarAlquilerPorVehiculo?placa=${placa}`);
}

RegistrarDevolucion(datos: { numeroAlquiler: number, fechaReal: string, cobroAdicional: number }): Observable<any> {
  return this.http.post(`${this.apiUrl}/RegistrarDevolucion`, datos);
}

// Busca un alquiler por su número de alquiler
BuscarAlquilerPorId(numeroAlquiler: number): Observable<Alquiler> {
  return this.http.get<Alquiler>(`${this.apiUrl}/BuscarAlquiler?numeroAlquiler=${numeroAlquiler}`);
}



    
}