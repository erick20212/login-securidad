import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-registro-evaluaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro-evaluaciones.component.html',
  styleUrl: './registro-evaluaciones.component.css'
})
export class RegistroEvaluacionesComponent {
  @Output() modalClosed = new EventEmitter<void>();

  isConfirmationModalVisible = false;
  confirmationMessage = '';
  confirmationButtonText = '';
  actionType: 'save' | 'delete' | null = null;

  closeModal() {
    this.modalClosed.emit();
  }

  openConfirmationModal(action: 'save' | 'delete'): void {
    this.isConfirmationModalVisible = true;
    if (action === 'save') {
      this.confirmationMessage = '¿Estás seguro de guardar esta sesión?';
      this.confirmationButtonText = 'Guardar';
      this.actionType = 'save';
    } else if (action === 'delete') {
      this.confirmationMessage = '¿Estás seguro de eliminar esta sesión?';
      this.confirmationButtonText = 'Eliminar';
      this.actionType = 'delete';
    }
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalVisible = false;
    this.actionType = null;
  }

  confirmAction(): void {
    if (this.actionType === 'save') {
      this.saveSession();
    } else if (this.actionType === 'delete') {
      this.deleteSession();
    }
    this.closeConfirmationModal();
  }

  saveSession(): void {
    console.log('Sesión guardada');
    // Lógica adicional para guardar la sesión
  }

  deleteSession(): void {
    console.log('Sesión eliminada');
    // Lógica adicional para eliminar la sesión
  }

  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Archivo seleccionado:', file.name);
      // Mostrar nombre del archivo seleccionado en la UI (opcional)
    }
  }
}