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

  cargarSolicitudes(): void {
    this.solicitudService.getSolicitudes().subscribe({
      next: (data: SolicitudDto[]) => {
        console.log('Solicitudes obtenidas:', data); // Verifica si las solicitudes tienen los datos correctos
        this.solicitudes = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error('Error al cargar las solicitudes.', 'Error');
        console.error('Error:', error);
        this.isLoading = false;
      },
    });
  }
  getEstadoClase(estado: string | null): string {
    switch (estado) {
      case 'En Proceso':
        return 'en-proceso';
      case 'Aprobada':
        return 'aprobada';
      case 'Rechazada':
        return 'rechazada';
      default:
        return '';
    }
  }
  
  verDetalle(id: number | null): void {
    console.log('Ver detalle para la solicitud con ID:', id);
    // Aquí podrías navegar a otra vista o abrir un modal con los detalles.
  }
}