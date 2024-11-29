import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesEstadisticasService {

  private apiUrl = 'http://localhost:8080/api/usuario_role/roles';  // Asegúrate de que la URL sea la correcta

  constructor(private http: HttpClient) { }

  // Método para obtener las estadísticas de roles
  getRolesEstadisticas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
