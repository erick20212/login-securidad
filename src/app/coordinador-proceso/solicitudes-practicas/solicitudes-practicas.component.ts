import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass, NgIf } from '@angular/common'; // Importar NgClass y NgIf directamente
import { DetalleSolicitudComponent } from './detalle-solicitud/detalle-solicitud.component';

interface Proceso {
  nombre: string;
  codigo: string;
  empresa: string;
  ruc: string;
  estado: string;
}

@Component({
  selector: 'app-solicitudes-practicas',
  standalone: true,
  imports: [CommonModule, DetalleSolicitudComponent, NgClass, NgIf], // Asegúrate de incluir NgClass y NgIf
  templateUrl: './solicitudes-practicas.component.html',
  styleUrls: ['./solicitudes-practicas.component.css'],
})
export class SolicitudesPracticasComponent {
  procesos: Proceso[] = [
    { nombre: 'Empresa 001', codigo: '202420900', empresa: 'Apple', ruc: '20100020004', estado: 'En espera' },
    { nombre: 'Empresa 002', codigo: '202420901', empresa: 'Microsoft', ruc: '20100020005', estado: 'En proceso' },
  ];

  procesoSeleccionado: Proceso | null = null;

  mostrarDetalle(proceso: Proceso): void {
    this.procesoSeleccionado = proceso;
  }

  cerrarDetalle(): void {
    this.procesoSeleccionado = null;
  }
}
