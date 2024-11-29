import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitudDto } from '../../interfaces/solicitud-dto';
import { SolicitudService } from '../../core/services/solicitud.service';
import { ToastrService } from 'ngx-toastr'; // Asegúrate de tener ngx-toastr instalado

@Component({
  selector: 'app-lista-procesos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-procesos.component.html',
  styleUrls: ['./lista-procesos.component.css']
})
export class ListaProcesosComponent implements OnInit {
  solicitudes: SolicitudDto[] = [];
  solicitudesEnProceso: SolicitudDto[] = []; // Almacena las solicitudes filtradas
  loading: boolean = true;

  // Control del modal de eliminación
  mostrarModalEliminar: boolean = false;

  constructor(
    private solicitudService: SolicitudService,
    private toastr: ToastrService // Para notificaciones
  ) {}

  ngOnInit(): void {
    // Consumir el endpoint para obtener las solicitudes
    this.solicitudService.getSolicitudesDelEstudiante().subscribe(
      (data) => {
        this.solicitudes = data; // Asignamos todas las solicitudes obtenidas
        this.solicitudesEnProceso = this.solicitudes.filter(
          solicitud => solicitud.estado === 'En proceso'
        ); // Filtrar solicitudes en proceso
        this.loading = false; // Cambiamos el estado de carga
      },
      (error) => {
        console.error('Error al obtener las solicitudes del estudiante autenticado', error);
        this.loading = false; // En caso de error cambiamos el estado de carga
      }
    );
  }

  // Abrir modal de eliminación
  abrirModalEliminar(): void {
    this.mostrarModalEliminar = true;
  }

  // Cerrar modal de eliminación
  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
  }

  // Método para eliminar una solicitud
  eliminarSolicitud(id: number): void {
    console.log(`Intentando eliminar solicitud con ID: ${id}`); // Depuración
    this.solicitudService.deleteSolicitud(id).subscribe({
      next: () => {
        this.toastr.success('Solicitud eliminada correctamente', 'Éxito');
        // Actualiza las listas después de eliminar
        this.solicitudes = this.solicitudes.filter(solicitud => solicitud.id !== id);
        this.solicitudesEnProceso = this.solicitudesEnProceso.filter(solicitud => solicitud.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar la solicitud:', error);
        this.toastr.error('No se pudo eliminar la solicitud.', 'Error');
      }
    });
  }
}