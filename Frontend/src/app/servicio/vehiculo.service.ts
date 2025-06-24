import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../entities/vehiculo';
import { Observable } from 'rxjs';
import { Alquiler } from './alquiler.service';

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

  private bdURLA = "http://localhost:8080/ver/GuardarAlquiler";
  alquilarVehiculo(alquiler: Alquiler): Observable<Alquiler> {
    console.log('Alquiler:', alquiler);
    var resp = this.httpClient.post<Alquiler>(`${this.bdURLA}`, alquiler);
    console.log(resp);
    return resp;

  }
}
