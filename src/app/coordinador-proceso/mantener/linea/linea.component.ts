import { Component, OnInit } from '@angular/core';
import { LineaService } from '../../../core/services/linea.service';  // Servicio para manejar líneas
import { Linea } from '../../../interfaces/linea';  // Interfaz Linea (ajusta la ruta si es necesario)
import { MessageService } from 'primeng/api';  // Para mostrar notificaciones
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-linea',
  standalone: true,
  imports: [DialogModule, FormsModule, CommonModule],
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.css'], // Cambiado `styleUrl` a `styleUrls`
})
export class LineaComponent implements OnInit {
  isListDialogVisible: boolean = false;  // Controla la visibilidad del diálogo de listado
  isLineaDialogVisible: boolean = false;  // Controla la visibilidad del diálogo de agregar línea
  lineas: Linea[] = [];  // Lista de líneas
  selectedLinea: Linea = { id: 0, nombre: '', estado: '' };  // Inicialización predeterminada
  linea: Linea = { id: 0, nombre: '', estado: '' };  // Modelo para la nueva línea
  displayEditDialog: boolean = false;  // Controla la visibilidad del diálogo de edición
  isVisible: { [key: string]: boolean } = {};  // Para manejar la visibilidad de las secciones
  submitted: boolean = false;  // Para manejar validaciones

  constructor(private lineaService: LineaService, private messageService: MessageService) {}

  ngOnInit() {
    this.getLineas();
  }

  // Obtener las líneas
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

  // Toggle para la visibilidad de las secciones
  toggleSection(section: string) {
    this.isVisible[section] = !this.isVisible[section];
  }

  // Verificar si una sección es visible
  isSectionVisible(section: string): boolean {
    return this.isVisible[section] || false;
  }

  // Abrir el diálogo para agregar una nueva línea
  openAddLineaDialog() {
    this.linea = { id: 0, nombre: '', estado: '' };  // Resetear el formulario
    this.isLineaDialogVisible = true;
  }

  // Cerrar el diálogo de agregar línea
  closeLineaDialog() {
    this.isLineaDialogVisible = false;
    this.submitted = false;  // Resetear la validación
  }

  // Crear una nueva línea
  createLinea() {
    this.submitted = true;
    if (!this.linea.nombre) {
      return;  // Si no hay nombre, no guardar
    }

    this.lineaService.createLinea(this.linea).subscribe({
      next: (data) => {
        this.lineas.push(data);  // Añadir la nueva línea a la lista
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Línea creada con éxito',
        });
        this.isLineaDialogVisible = false;  // Cerrar el diálogo
        this.linea = { id: 0, nombre: '', estado: '' };  // Limpiar el formulario
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

  // Seleccionar una opción (para editar, eliminar, etc.)
  selectOption(option: string) {
    if (option === 'lineas') {
      this.getLineas();  // Recargar las líneas
    }
    // Implementa otras opciones según sea necesario
  }

  // Editar una línea
  editLinea(linea: Linea) {
    this.selectedLinea = { ...linea };
    this.displayEditDialog = true;
  }

  // Actualizar una línea
  updateLinea() {
    if (this.selectedLinea) {
      this.lineaService.updateLinea(this.selectedLinea).subscribe({
        next: (data) => {
          const index = this.lineas.findIndex(l => l.id === data.id);
          if (index !== -1) {
            this.lineas[index] = data;  // Actualizar la línea en la lista
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Línea actualizada con éxito',
          });
          this.displayEditDialog = false;  // Cerrar el diálogo de edición
          this.selectedLinea = { id: 0, nombre: '', estado: '' };  // Inicialización predeterminada

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

  // Eliminar una línea
  deleteLinea(id: number) {
    this.lineaService.deleteLinea(id).subscribe({
      next: () => {
        this.lineas = this.lineas.filter(linea => linea.id !== id);  // Eliminar de la lista
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Línea eliminada con éxito',
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

  // Cancelar la edición
  cancelEdit() {
    this.displayEditDialog = false;
    this.selectedLinea = { id: 0, nombre: '', estado: '' };  // Inicialización predeterminada

  }

  // Método para exportar las líneas a EXCEL (opcional, puedes usar una librería como SheetJS)
  exportLineasToExcel() {
    // Implementa la lógica para exportar las líneas
  }
}
