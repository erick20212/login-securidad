import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { PersonaUsuarioDTO, SupervisorDTO } from '../../interfaces/mantener';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
  private readonly apiUrl = 'http://localhost:8080/api'; // Cambiar la URL según sea necesario

  constructor(private http: HttpClient) {}

  /**
   * Guardar un supervisor.
   * @param supervisor Datos del supervisor en formato PersonaUsuarioDTO.
   * @returns Observable con la respuesta del servidor.
   */
  saveSupervisor(supervisor: PersonaUsuarioDTO): Observable<any> {
    const url = `${this.apiUrl}/persona-usuario/crear`;
    return this.http.post(url, supervisor).pipe(
      catchError((error) => {
        console.error('Error al guardar el supervisor:', error);
        return of({ success: false, message: 'No se pudo guardar el supervisor' });
      })
    );
  }

  /**
   * Obtener la lista de supervisores.
   * @returns Observable con la lista de supervisores.
   */
  getSupervisores(): Observable<SupervisorDTO[]> {
    const url = `${this.apiUrl}/supervisores/listar`;
    return this.http.get<SupervisorDTO[]>(url).pipe(
      catchError((error) => {
        console.error('Error al obtener supervisores:', error);
        return of([]);  // Devolver un array vacío en caso de error
      })
    );
  }

  /**
   * Actualizar un supervisor.
   * @param supervisor Datos del supervisor a actualizar.
   * @returns Observable con la respuesta del servidor.
   */
/**
 * Actualizar un supervisor.
 * @param supervisor SupervisorDTO con los datos a actualizar.
 * @returns Observable con la respuesta del servidor.
 */
updateSupervisor(supervisor: SupervisorDTO): Observable<any> {
  const url = `${this.apiUrl}/supervisores/${supervisor.id}`; // Construir la URL con el ID del supervisor
  return this.http.put(url, supervisor).pipe(
    catchError((error) => {
      console.error('Error al actualizar el supervisor:', error); // Log del error en consola
      return of({ success: false, message: 'No se pudo actualizar el supervisor' }); // Respuesta de error genérica
    })
  );
}

/**
 * Eliminar un supervisor.
 * @param supervisorId ID del supervisor a eliminar.
 * @returns Observable con la respuesta del servidor.
 */
deleteSupervisor(supervisorId: number): Observable<any> {
  const url = `${this.apiUrl}/supervisores/${supervisorId}`; // Endpoint de eliminación
  return this.http.delete(url).pipe(
    catchError((error) => {
      console.error('Error al eliminar el supervisor:', error); // Log del error en consola
      return of({ success: false, message: 'No se pudo eliminar el supervisor' }); // Respuesta de error genérica
    })
  );
}
}
