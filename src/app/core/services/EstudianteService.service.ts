import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Estudiante } from '../../interfaces/estudiante';
import { EstudianteDto } from '../../interfaces/solicitud-dto';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private apiUrl = 'http://localhost:8080/api/estudiantess'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Crear un nuevo estudiante
  createEstudiante(estudiante: Estudiante): Observable<Estudiante | null> {
    return this.http.post<Estudiante>(`${this.apiUrl}/crear`, estudiante).pipe(
      catchError((error) => {
        console.error('Error al crear estudiante:', error);
        return of(null);  // Retornar 'null' o un valor adecuado en caso de error
      })
    );
  }

  getEstudiantes(): Observable<Estudiante[]> {
    const url = `${this.apiUrl}/listar`; // URL específica para obtener los estudiantes
    return this.http.get<Estudiante[]>(url).pipe(
      catchError((error) => {
        console.error('Error al obtener estudiantes:', error);
        return of([]);  // Devolver un array vacío en caso de error
      })
    );
  }
  
  updateEstudiante(estudiante: Estudiante): Observable<any> {
    const url = `${this.apiUrl}/${estudiante.id}`; // URL base de la API y el ID del estudiante
    return this.http.put(url, estudiante).pipe(
      catchError((error) => {
        console.error('Error al actualizar el estudiante:', error); // Log del error en consola
        return of({ success: false, message: 'No se pudo actualizar el estudiante' }); // Respuesta de error genérica
      })
    );
  }
}
