import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private apiUrl = 'http://localhost:8080/api/excel'; // Cambia la URL según tu configuración del backend

  constructor(private http: HttpClient) {}

  procesarExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name); // Agrega el archivo al FormData

    return this.http.post(`${this.apiUrl}/upload `, formData);
  }
}