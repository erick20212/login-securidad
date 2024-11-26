import { Component, ViewChild, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DetalleAprobacionComponent } from './detalle-aprobacion/detalle-aprobacion.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmpresaDto, SolicitudDto } from '../../interfaces/solicitud-dto';
import { SolicitudService } from '../../core/services/solicitud.service';
import { HttpClient } from '@angular/common/http';


interface Proceso {
  nombre: string;
  codigo: string;
  empresa: string;
  ruc: string;
  estado: string;
  idSolicitud: number | null;
}

@Component({
  selector: 'app-lista-solicitudes-aprobadas',
  standalone: true,
  imports: [DetalleAprobacionComponent, CommonModule, FormsModule],
  templateUrl: './lista-solicitudes-aprobadas.component.html',
  styleUrls: ['./lista-solicitudes-aprobadas.component.css']
})
export class ListaSolicitudesAprobadasComponent implements OnInit {
  @ViewChild(DetalleAprobacionComponent) detalleAprobacionComponent!: DetalleAprobacionComponent;

  solicitudes: SolicitudDto[] = []; // Lista de solicitudes aprobadas
  isLoading: boolean = true; // Indicador de carga
  showRejectReasonModal = false;
  rejectReason: string = ''; // Razón de rechazo
  selectedSolicitud: SolicitudDto | null = null; // Solicitud seleccionada para rechazo o edición

  constructor(private toastr: ToastrService, private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.loadSolicitudesAprobadas();
  }

  // Cargar solo las solicitudes aprobadas
  loadSolicitudesAprobadas(): void {
    this.isLoading = true;
    this.solicitudService.getSolicitudesAprobadas().subscribe({
      next: (data: SolicitudDto[]) => {
        this.solicitudes = data; // Asignamos las solicitudes aprobadas
        this.isLoading = false; // Cambiamos el indicador de carga
      },
      error: (err: any) => {
        this.toastr.error('Error al cargar las solicitudes aprobadas', 'Error');
        console.error(err);
        this.isLoading = false; // Indicador de carga a falso en caso de error
      },
    });
  }

  mostrarDetalle(solicitud: SolicitudDto): void {
    this.toastr.info('Mostrando detalles de: ' + solicitud.estudiante?.nombre);
    this.detalleAprobacionComponent.openModal();
  }

  openRejectModal(solicitud: SolicitudDto): void {
    this.selectedSolicitud = solicitud;
    this.showRejectReasonModal = true;
  }

  sendRejectReason(): void {
    if (this.selectedSolicitud) {
      const payload = {
        codigo: this.selectedSolicitud.estudiante?.codigo || '',
        razon: this.rejectReason,
      };

      this.solicitudService.rejectSolicitud(payload).subscribe({
        next: () => {
          this.toastr.warning(`Solicitud de ${this.selectedSolicitud?.estudiante?.nombre} rechazada: ${this.rejectReason}`);
          this.rejectReason = '';
          this.selectedSolicitud = null;
          this.showRejectReasonModal = false;
          this.loadSolicitudesAprobadas(); // Recargar solicitudes aprobadas
        },
        error: (err: any) => {
          this.toastr.error('Error al rechazar la solicitud', 'Error');
          console.error(err);
        },
      });
    }
  }
}