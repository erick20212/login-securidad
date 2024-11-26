import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { DetalleSolicitudComponent } from './detalle-solicitud/detalle-solicitud.component';
import { SolicitudService } from '../../core/services/solicitud.service';
import { SolicitudDto } from '../../interfaces/solicitud-dto'; // Usa la interfaz desde un archivo compartido
import { ChangeDetectorRef } from '@angular/core';

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
  
  // Variables para el modal
  mostrarModal: boolean = false; // Control del modal
  solicitudSeleccionada: SolicitudDto | null = null; // Datos de la solicitud seleccionada

  constructor(
    private solicitudService: SolicitudService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef
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

  // Método para abrir el modal con los datos de una solicitud
  abrirModal(solicitud: SolicitudDto): void {
    this.solicitudSeleccionada = solicitud;
    this.mostrarModal = true;
  }

  // Método para cerrar el modal
  cerrarModal(): void {
    this.mostrarModal = false;
    this.solicitudSeleccionada = null;
  }

  // Método para cambiar el estado de una solicitud
  cambiarEstadoSolicitud(solicitudId: number, nuevoEstado: string): void {
    this.solicitudService.actualizarEstadoSolicitud(solicitudId, nuevoEstado).subscribe({
      next: () => {
        this.toastr.success(`Estado cambiado a ${nuevoEstado}`, 'Éxito');
        
        // Encuentra y actualiza el estado de la solicitud en el listado
        const solicitud = this.solicitudes.find(s => s.id === solicitudId);
        if (solicitud) {
          solicitud.estado = nuevoEstado;
        }
  
        // Sincroniza también el estado del modal
        if (this.solicitudSeleccionada) {
          this.solicitudSeleccionada.estado = nuevoEstado;
        }
  
        // Fuerza la detección de cambios
        this.cdr.detectChanges();
  
        // Cierra el modal
        this.cerrarModal();
      },
      error: (error) => {
        this.toastr.error('Error al cambiar el estado.', 'Error');
        console.error('Error al cambiar el estado:', error);
      },
    });
  }

  getSolicitudEstadoClase(estado: string | null): string {
    if (!estado) {
      return 'estado-default'; // Clase predeterminada si no hay estado
    }
    switch (estado.toLowerCase()) {
      case 'aceptado':
        return 'estado-aprobado'; // Clase verde para aceptado
      case 'rechazado':
        return 'estado-rechazado'; // Clase roja para rechazado
      default:
        return 'estado-default'; // Clase gris para otros estados
    }
  }

  // Método para asignar clases dinámicas según el estado
  getEstadoClase(estado: string | null): string {
    if (!estado) {
      return 'estado-default'; // Clase para estados no definidos
    }
    switch (estado.toLowerCase()) {
      case 'aceptado':
        return 'estado-aprobado'; // Clase para estado aceptado
      case 'rechazado':
        return 'estado-rechazado'; // Clase para estado rechazado
      default:
        return 'estado-default'; // Clase para cualquier otro estado
    }
  }
}
