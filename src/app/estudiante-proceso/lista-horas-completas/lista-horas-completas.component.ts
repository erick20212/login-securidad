import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-horas-completas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-horas-completas.component.html',
  styleUrl: './lista-horas-completas.component.css'
})
export class ListaHorasCompletasComponent {
  isModalVisible: boolean = false;
  items = [
    { nombre: 'Dolton Tom Meza A.', codigo: '202420900' },
    { nombre: 'Paolo la Iola', codigo: '202420900' },
    { nombre: 'Lorena Susan Altamirano', codigo: '202420900' },
  ];

  openUploadModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  confirmUpload(): void {
    console.log('Archivo de constancia subido.');
    this.closeModal();
  }
}