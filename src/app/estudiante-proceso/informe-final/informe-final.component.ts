import { Component } from '@angular/core';

@Component({
  selector: 'app-informe-final',
  standalone: true,
  imports: [],
  templateUrl: './informe-final.component.html',
  styleUrl: './informe-final.component.css'
})
export class InformeFinalComponent {
  onUploadFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log('Archivos seleccionados:', input.files);
      // Procesar archivos aquí
      Array.from(input.files).forEach((file) => {
        console.log(`Archivo: ${file.name}`);
      });
    }
  }

  onCancel(): void {
    console.log('Operación cancelada');
  }

  onConfirm(): void {
    console.log('Operación confirmada');
  }
}