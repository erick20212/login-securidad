import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudDto } from '../../interfaces/solicitud-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
 
  private apiUrl = 'http://localhost:8080/api/solicitudes';

  constructor(private http: HttpClient) {}

  // Obtener datos iniciales y solicitudes
  getDatosInicialesYSolicitudes(): Observable<{ datosIniciales: SolicitudDto; solicitudes: SolicitudDto[] }> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<{ datosIniciales: SolicitudDto; solicitudes: SolicitudDto[] }>(`${this.apiUrl}`, { headers });
  }

  // Guardar una solicitud
  saveSolicitud(solicitud: SolicitudDto): Observable<{ message: string }> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<{ message: string }>(this.apiUrl, solicitud, { headers });
  }

  // Obtener todas las solicitudes para el coordinador
  getSolicitudes(): Observable<SolicitudDto[]> {
    return this.http.get<SolicitudDto[]>('http://localhost:8080/api/solicitudes/list');
  }

  // Rechazar una solicitud
  rejectSolicitud(payload: { codigo: string | undefined; razon: string }): Observable<void> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<void>(`${this.apiUrl}/rechazar`, payload, { headers });
  }

  // Método para crear las cabeceras con el token
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('accessToken'); // Cambiado a 'accessToken'
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}