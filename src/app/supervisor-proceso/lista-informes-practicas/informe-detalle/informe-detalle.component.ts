import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-informe-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informe-detalle.component.html',
  styleUrl: './informe-detalle.component.css',
})
export class InformeDetalleComponent {
  @Output() modalClosed = new EventEmitter<void>();
  
  isModalVisible = true;
  isRejectModalVisible = false;
  isCommentModalVisible = false;
  alertMessage: string | null = null;
  alertType: string = 'success';

  closeModal(): void {
    this.isModalVisible = false;
    this.modalClosed.emit();
  }

  showAlert(message: string, type: string): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000);
  }

  openRejectModal(): void {
    this.isRejectModalVisible = true;
  }

  closeRejectModal(): void {
    this.isRejectModalVisible = false;
  }

  proceedReject(): void {
    this.showAlert('Documento rechazado', 'error');
    this.closeRejectModal();
    this.openCommentModal();
  }

  openCommentModal(): void {
    this.isCommentModalVisible = true;
  }

  closeCommentModal(): void {
    this.isCommentModalVisible = false;
  }

  submitComment(): void {
    this.showAlert('Comentario enviado', 'success');
    this.closeCommentModal();
  }
}