import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../core/services/EstudianteService.service';
import { Estudiante } from '../../../interfaces/estudiante';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api'; // Para confirmación
import { TableModule } from 'primeng/table'; // Importa TableModule

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CommonModule,
    ToastModule,
    DialogModule,
    TableModule
  ],
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css'],
  providers: [ConfirmationService] // Añadir servicio de confirmación
})
export class EstudianteComponent implements OnInit {
  estudiante: Estudiante = { nombre: '', apellido: '', email: '', dni: '', codigo: '', telefono: '' };
  submitted: boolean = false;
  private visibleSections: { [key: string]: boolean } = {};
  isDialogVisible: boolean = false;
  isListDialogVisible: boolean = false;
  estudiante2: Estudiante[] = [];
  selectedEstudiante: Estudiante = { nombre: '', apellido: '', email: '', dni: '', codigo: '', telefono: '' };
  displayEditDialog: boolean = false; // Visibilidad del cuadro de diálogo
  showDeleteButton: boolean = true;  // Controla la visibilidad del botón de eliminar
  displayDeleteDialog: boolean = false; // Dialog de confirmación
  // Propiedades para paginación y estado de carga
  first: number = 0; // Establece el primer índice de la página
  loading: boolean = false; // Controla el estado de carga

  constructor(private estudianteService: EstudianteService, private toastr: ToastrService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.loadEstudiantes();
  }

  toggleSection(section: string): void {
    this.visibleSections[section] = !this.visibleSections[section];
  }

  openAddEstudianteDialog(): void {
    this.isDialogVisible = true;
    this.estudiante = { nombre: '', apellido: '', email: '', dni: '', codigo: '', telefono: '' }; // Limpiar formulario
  }

  // Cerrar el diálogo
  closeDialog(): void {
    this.isDialogVisible = false;
  }

  isSectionVisible(section: string): boolean {
    return this.visibleSections[section] || false;
  }

  saveEstudiante(): void {
    if (this.estudiante.nombre && this.estudiante.apellido && this.estudiante.email && this.estudiante.dni) {
      this.estudianteService.createEstudiante(this.estudiante).subscribe({
        next: (response) => {
          this.toastr.success('Estudiante creado exitosamente.');
          this.isDialogVisible = false; // Cerrar diálogo
          this.loadEstudiantes(); // Recargar estudiantes
        },
        error: (error) => {
          this.toastr.error('Error al crear el estudiante.');
          console.error('Error al crear estudiante:', error);
        }
      });
    } else {
      this.toastr.warning('Todos los campos son obligatorios.');
    }
  }

  openListEstudianteDialog(): void {
    this.isListDialogVisible = true;
  }

  // Editar estudiante
  editEstudiante(estudiante: Estudiante) {
    this.selectedEstudiante = { ...estudiante }; // Creamos una copia del estudiante para evitar mutaciones directas
    this.displayEditDialog = true;
  }

  // Actualizar estudiante
  updateEstudiante(): void {
    if (this.selectedEstudiante) {
      // Aquí puedes actualizar el estudiante localmente si lo estás manteniendo en un servicio
      this.estudianteService.updateEstudiante(this.selectedEstudiante).subscribe({
        next: (response) => {
          // Actualizamos el arreglo de estudiantes
          const index = this.estudiante2.findIndex(est => est.id === this.selectedEstudiante.id);
          if (index !== -1) {
            this.estudiante2[index] = { ...this.selectedEstudiante }; // Actualizamos los datos
          }

          // Cerrar diálogo de edición
          this.displayEditDialog = false;

          // Mostrar mensaje de éxito
          this.toastr.success('Estudiante actualizado correctamente.');
        },
        error: (error) => {
          this.toastr.error('Error al actualizar el estudiante.');
          console.error('Error al actualizar estudiante:', error);
        }
      });
    }
  }

  // Cargar lista de estudiantes
  loadEstudiantes(): void {
    this.estudianteService.getEstudiantes().subscribe({
      next: (data: Estudiante[]) => {
        this.estudiante2 = data;
      },
      error: (error) => {
        console.error('Error cargando estudiantes', error);
      }
    });
  }
}
