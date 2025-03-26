import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/api/vehiculos';  // URL de la API para vehículos

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token en el header
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
