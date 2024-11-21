import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudRenunciaComponent } from './solicitud-renuncia/solicitud-renuncia.component';

interface ProcessItem {
  title: string;
  status: 'confirmado' | 'en-proceso' | 'pendiente';
  file?: File;
}

@Component({
  selector: 'app-estado-proceso',
  standalone: true,
  imports: [CommonModule, SolicitudRenunciaComponent],
  templateUrl: './estado-proceso.component.html',
  styleUrls: ['./estado-proceso.component.css']
})
export class EstadoProcesoComponent implements OnInit {
  @ViewChild(SolicitudRenunciaComponent) solicitudRenunciaModal!: SolicitudRenunciaComponent;

  processItems: ProcessItem[] = [
    { title: 'Adjuntar carta de presentación', status: 'confirmado' },
    { title: 'Carta de Aceptación y Conve...', status: 'confirmado' },
    { title: 'Plan de PPP', status: 'en-proceso' },
    { title: 'Evaluaciones de PPP', status: 'pendiente' },
    { title: 'Evaluaciones de PPP-Empresa', status: 'pendiente' },
    { title: 'Informe final', status: 'pendiente' }
  ];

  practitioner = {
    id: 'Practicante 000',
    startDate: '**/**/**',
    endDate: '**/**/**',
    supervisor: '******'
  };

  progressPercentage: number = 8;

  constructor() {}

  ngOnInit(): void {}

  onFileUpload(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.processItems[index].file = file;
      this.processItems[index].status = 'confirmado';
      console.log(`Archivo cargado: ${file.name} para el proceso "${this.processItems[index].title}"`);
    }
  }

  openRenunciaModal(): void {
    this.solicitudRenunciaModal.openModal(); // Llama al método del componente hijo
  }

  closeRenunciaModal(): void {
    this.solicitudRenunciaModal.closeModal(); // Llama al método del componente hijo
  }
}
