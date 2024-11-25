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

  solicitudes: SolicitudDto[] = []; // Lista de solicitudes
  showRejectConfirmModal = false;
  showRejectReasonModal = false;
  rejectReason: string = ''; // Propiedad añadida para almacenar la razón de rechazo
  selectedSolicitud: SolicitudDto | null = null; // Solicitud seleccionada

  constructor(private toastr: ToastrService, private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.loadSolicitudes();
  }

  loadSolicitudes(): void {
    this.solicitudService.getSolicitudes().subscribe({
      next: (data: SolicitudDto[]) => {
        this.solicitudes = data;
      },
      error: (err: any) => {
        this.toastr.error('Error al cargar las solicitudes', 'Error');
        console.error(err);
      },
    });
  }

  openEditModal(solicitud: SolicitudDto): void {
    this.selectedSolicitud = solicitud;
    // Implementar lógica para editar si es necesario
  }

  openRejectModal(solicitud: SolicitudDto): void {
    this.selectedSolicitud = solicitud;
    this.showRejectConfirmModal = true;
  }

  closeRejectConfirmModal(): void {
    this.showRejectConfirmModal = false;
    this.selectedSolicitud = null;
  }

  confirmReject(): void {
    this.showRejectConfirmModal = false;
    this.showRejectReasonModal = true; // Abrir modal para ingresar razón de rechazo
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
          this.showRejectReasonModal = false;
          this.rejectReason = '';
          this.selectedSolicitud = null;
          this.loadSolicitudes(); // Recargar solicitudes
        },
        error: (err: any) => {
          this.toastr.error('Error al rechazar la solicitud', 'Error');
          console.error(err);
        },
      });
    }
  }

  mostrarDetalle(solicitud: SolicitudDto): void {
    this.toastr.info('Mostrando detalles de: ' + solicitud.estudiante?.nombre);
    this.detalleAprobacionComponent.openModal();
  }

  aceptarSolicitud(solicitud: SolicitudDto): void {
    this.toastr.success('Solicitud de ' + solicitud.estudiante?.nombre + ' aceptada');
  }
}