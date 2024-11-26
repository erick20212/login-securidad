import { Component, OnInit } from '@angular/core';
import { LineaService } from '../../../core/services/linea.service';  // Servicio para manejar líneas
import { Linea } from '../../../interfaces/linea';  // Interfaz Linea
import { MessageService } from 'primeng/api';  // Para mostrar notificaciones
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-linea',
  standalone: true,
  imports: [DialogModule, FormsModule, CommonModule],
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.css'], 
})
export class LineaComponent implements OnInit {
  isListDialogVisible: boolean = false;
  isLineaDialogVisible: boolean = false;
  lineas: Linea[] = [];
  selectedLinea: Linea = { id: 0, nombre: '', estado: '' };
  linea: Linea = { id: 0, nombre: '', estado: '' };
  displayEditDialog: boolean = false;
  isVisible: { [key: string]: boolean } = {};
  submitted: boolean = false;

  constructor(private lineaService: LineaService, private messageService: MessageService) {}

  ngOnInit() {
    this.getLineas();
  }

  getLineas() {
    this.lineaService.getLineas().subscribe({
      next: (data: Linea[]) => {
        this.lineas = data;
      },
      error: (err: any) => {
        console.error('Error al cargar las líneas', err);
      }
    });
  }

  toggleSection(section: string) {
    this.isVisible[section] = !this.isVisible[section];
  }

  isSectionVisible(section: string): boolean {
    return this.isVisible[section] || false;
  }

  openAddLineaDialog() {
    this.linea = { id: 0, nombre: '', estado: '' };
    this.isLineaDialogVisible = true;
  }

  closeLineaDialog() {
    this.isLineaDialogVisible = false;
    this.submitted = false;
  }

  createLinea() {
    this.submitted = true;
    if (!this.linea.nombre) {
      return;
    }

    this.lineaService.createLinea(this.linea).subscribe({
      next: (data) => {
        this.lineas.push(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Línea creada con éxito',
        });
        this.isLineaDialogVisible = false;
        this.linea = { id: 0, nombre: '', estado: '' };
      },
      error: (err) => {
        console.error('Error al crear línea', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear la línea.',
        });
      }
    });
  }

  selectOption(option: string) {
    if (option === 'lineas') {
      this.getLineas();
    }
  }

  editLinea(linea: Linea) {
    this.selectedLinea = { ...linea };
    this.displayEditDialog = true;
  }

  updateLinea() {
    if (this.selectedLinea) {
      this.lineaService.updateLinea(this.selectedLinea).subscribe({
        next: (data) => {
          const index = this.lineas.findIndex(l => l.id === data.id);
          if (index !== -1) {
            this.lineas[index] = data;
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Línea actualizada con éxito',
          });
          this.displayEditDialog = false;
          this.selectedLinea = { id: 0, nombre: '', estado: '' };
        },
        error: (err) => {
          console.error('Error al actualizar línea', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar la línea.',
          });
        }
      });
    }
  }

  cancelEdit() {
    this.displayEditDialog = false;
    this.selectedLinea = { id: 0, nombre: '', estado: '' };
  }

  deleteLinea(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta línea?')) {
      this.lineaService.deleteLinea(id).subscribe({
        next: () => {
          this.lineas = this.lineas.filter(linea => linea.id !== id);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Línea eliminada correctamente',
          });
        },
        error: (err) => {
          console.error('Error al eliminar línea', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar la línea.',
          });
        }
      });
    }
  }
}
