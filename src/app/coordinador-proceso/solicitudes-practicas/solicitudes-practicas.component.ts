import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { DetalleSolicitudComponent } from './detalle-solicitud/detalle-solicitud.component';
import { SolicitudService } from '../../core/services/solicitud.service';
import { SolicitudDto } from '../../interfaces/solicitud-dto'; // Usa la interfaz desde un archivo compartido

@Component({
  selector: 'app-solicitudes-practicas',
  standalone: true,
  imports: [CommonModule, NgClass, NgIf, DetalleSolicitudComponent],
  templateUrl: './solicitudes-practicas.component.html',
  styleUrls: ['./solicitudes-practicas.component.css'],
})
export class SolicitudesPracticasComponent implements OnInit {
  solicitudes: SolicitudDto[] = [];
  isLoading: boolean = true;

  constructor(
    private solicitudService: SolicitudService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  // Método para cargar las solicitudes
  cargarSolicitudes(): void {
    this.solicitudService.getSolicitudes().subscribe({
      next: (data: SolicitudDto[]) => {
        this.solicitudes = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error('Error al cargar las solicitudes.', 'Error');
        console.error('Error al cargar las solicitudes:', error);
        this.isLoading = false;
      },
    });
  }

  // Método para cambiar el estado de una solicitud
  cambiarEstadoSolicitud(solicitudId: number, nuevoEstado: string): void {
    this.solicitudService.actualizarEstadoSolicitud(solicitudId, nuevoEstado).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Estado Actualizado');
        // Actualizar el estado en la lista local
        const solicitud = this.solicitudes.find(s => s.id === solicitudId);
        if (solicitud) {
          solicitud.estado = nuevoEstado;
        }
      },
      error: (error) => {
        this.toastr.error('Error al actualizar el estado.', 'Error');
        console.error('Error al actualizar el estado:', error);
      },
    });
  }

  // Método para asignar clases dinámicas según el estado
  getEstadoClase(estado: string | null): string {
    if (!estado) {
      return '';
    }
    switch (estado.toLowerCase()) {
      case 'en proceso':
        return 'en-proceso';
      case 'aprobada':
        return 'aprobada';
      case 'rechazada':
        return 'rechazada';
      default:
        return 'estado-default';
    }
  }
}