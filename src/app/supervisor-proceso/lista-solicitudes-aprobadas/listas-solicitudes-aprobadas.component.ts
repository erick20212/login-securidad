import { Component } from '@angular/core';
import { RegistroEvaluacionesComponent } from "./registro-evaluaciones/registro-evaluaciones.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-solicitudes-aprobadas',
  standalone: true,
  imports: [RegistroEvaluacionesComponent,CommonModule],
  templateUrl: './listas-solicitudes-aprobadas.component.html',
  styleUrl: './listas-solicitudes-aprobadas.component.css'
})
export class ListasSolicitudesAprobadasComponent {
  isSesionModalVisible = false;

  openSesionModal() {
    this.isSesionModalVisible = true;
  }

  closeSesionModal() {
    this.isSesionModalVisible = false;
  }
}