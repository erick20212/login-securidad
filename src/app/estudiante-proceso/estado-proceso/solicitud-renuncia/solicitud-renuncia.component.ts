import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-solicitud-renuncia',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './solicitud-renuncia.component.html',
  styleUrls: ['./solicitud-renuncia.component.css']
})
export class SolicitudRenunciaComponent {
  isModalVisible = false;

  openModal(): void {
    this.isModalVisible = true; // Muestra el modal
  }

  closeModal(): void {
    this.isModalVisible = false; // Oculta el modal
  }

  submitForm(): void {
    console.log('Formulario enviado');
    this.closeModal(); // Cierra el modal después de enviar
  }
}
