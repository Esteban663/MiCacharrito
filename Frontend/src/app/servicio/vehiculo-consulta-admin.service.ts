import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vehiculo {
  placa: string;
  color: string;
  valor_diario: number;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehiculoConsultaAdminService {
  private baseUrl = 'http://localhost:8080/ver'; // Ajusta según tu configuración

  constructor(private http: HttpClient) { }

  // Método para buscar vehículos por tipo
 buscarVehiculosPorTipo(tipo: string): Observable<Vehiculo[]> {
  const params = new HttpParams().set('tipo', tipo);
  return this.http.get<Vehiculo[]>(`${this.baseUrl}/BuscarVehiculoPorTipo`, { params });
}

  // Método para obtener todos los vehículos (opcional)
  obtenerTodosLosVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.baseUrl}/Vehiculos`);
  }
}