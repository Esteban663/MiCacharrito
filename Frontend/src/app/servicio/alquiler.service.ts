import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../entities/usuario';
import { Vehiculo } from '../entities/vehiculo';

export interface Alquiler {
  numero_alquiler: number;
  usuario: Usuario;
  vehiculo: Vehiculo;
  fecha_inicio: Date;
  fecha_entrega: Date;
  valor_total: number;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  private apiUrl = 'http://localhost:8080/ver';

  constructor(private http: HttpClient) { }

  // Obtener todos los alquileres
  obtenerAlquileres(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(`${this.apiUrl}/Alquileres`);
  }

  // Obtener alquileres de un usuario específico
  obtenerAlquileresUsuario(identificacion: string): Observable<Alquiler[]> {
    const params = new HttpParams().set('identificacion', identificacion);
    return this.http.get<Alquiler[]>(`${this.apiUrl}/AlquileresUsuario`, { params });
  }

  // Obtener alquileres activos (pendientes de entrega) de un usuario
  obtenerAlquileresActivos(identificacion: string): Observable<Alquiler[]> {
    const params = new HttpParams().set('identificacion', identificacion);
    return this.http.get<Alquiler[]>(`${this.apiUrl}/AlquileresActivos`, { params });
  }

  // Cancelar un alquiler
  cancelarAlquiler(numeroAlquiler: number): Observable<string> {
    const params = new HttpParams().set('numeroAlquiler', numeroAlquiler.toString());
    return this.http.post(`${this.apiUrl}/CancelarAlquiler`, null, { 
      params, 
      responseType: 'text' 
    });
  }

  // Buscar un alquiler específico
  buscarAlquiler(numeroAlquiler: number): Observable<Alquiler> {
    const params = new HttpParams().set('numeroAlquiler', numeroAlquiler.toString());
    return this.http.get<Alquiler>(`${this.apiUrl}/BuscarAlquiler`, { params });
  }

  // Guardar un nuevo alquiler
  guardarAlquiler(alquiler: Alquiler): Observable<Alquiler> {
    return this.http.post<Alquiler>(`${this.apiUrl}/GuardarAlquiler`, alquiler);
  }

  
 
}
