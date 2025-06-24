import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../entities/vehiculo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private httpClient: HttpClient) { }


  private bdURL = "http://localhost:8080/ver/Vehiculos";
  obtenerListaVehiculos(): Observable<Vehiculo[]> {
      return this.httpClient.get<Vehiculo[]>(`${this.bdURL}`);
    }

  private bdURLC = "http://localhost:8080/ver/ActualizarEstadoVehiculo";
  actualizarVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.httpClient.post<Vehiculo>(`${this.bdURLC}`, vehiculo);
  }

  private BdURA = "http://localhost:8080/ver/BuscarVehiculoPorTipo";
  obtenerVehiculoPorTipo(tipo: string): Observable<Vehiculo[]> {
    return this.httpClient.get<Vehiculo[]>(`${this.BdURA}/${tipo}`);
  }

}
