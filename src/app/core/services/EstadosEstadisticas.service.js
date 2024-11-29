import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstadosEstadisticasService {
  private apiUrl = 'https://api.example.com/estados'; // URL de tu API para obtener los estados

  constructor(private http: HttpClient) {}

  // Método para obtener los datos de estados
  getEstadosEstadisticas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
