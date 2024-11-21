import { Component } from '@angular/core';
import { InformeDetalleComponent } from './informe-detalle/informe-detalle.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-informes-practicas',
  standalone: true,
  imports: [InformeDetalleComponent, CommonModule],
  templateUrl: './lista-informes-practicas.component.html',
  styleUrl: './lista-informes-practicas.component.css'
})
export class ListaInformesPracticasComponent {
  isModalVisible: boolean = false;

  openInformeDetalle(): void {
    this.isModalVisible = true;
  }

  closeInformeDetalle(): void {
    this.isModalVisible = false;
  }
}