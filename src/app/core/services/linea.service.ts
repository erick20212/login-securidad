import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Linea } from '../../interfaces/linea';

@Injectable({
  providedIn: 'root',
})
export class LineaService {
  private baseUrl = 'http://localhost:8080/api/linea'; // Asegúrate de tener la URL correcta

  constructor(private http: HttpClient) {}

  getLineas(): Observable<Linea[]> {
    return this.http.get<Linea[]>(this.baseUrl);
  }

  createLinea(linea: Linea): Observable<Linea> {
    return this.http.post<Linea>(this.baseUrl, linea);
  }

  updateLinea(linea: Linea): Observable<Linea> {
    // Usar comillas invertidas (backticks) correctamente
    return this.http.put<Linea>(`${this.baseUrl}/${linea.id}`, linea);
  }

  deleteLinea(id: number): Observable<void> {
    // Usar comillas invertidas (backticks) correctamente
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
