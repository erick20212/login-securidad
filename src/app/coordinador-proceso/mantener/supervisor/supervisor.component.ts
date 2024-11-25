import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastrService } from 'ngx-toastr'; // Para notificaciones
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
;
import { ConfirmationService, MessageService } from 'primeng/api';
import { PersonaUsuarioDTO, SupervisorDTO } from '../../../interfaces/mantener';
import { SupervisorService } from '../../../core/services/SupervisorService.service';

@Component({
  selector: 'app-supervisor',
  standalone: true,
  imports: [CommonModule, DialogModule, InputTextModule, ButtonModule, FormsModule, ToastModule],
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class SupervisorComponent implements OnInit {
  private visibleSections: { [key: string]: boolean } = {};  
  isDialogVisible: boolean = false;
  isListDialogVisible: boolean = false;
  submitted: boolean = false;
  selectedSupervisor: any = {};
  displayEditDialog: boolean = false; // Visibilidad del cuadro de diálogo

  // Usamos PersonaUsuarioDTO solo para insertar un nuevo supervisor
  supervisor: PersonaUsuarioDTO = { nombre: '', apellido: '', emailPersona: '', dni: '' };


  supervisores2: SupervisorDTO[] = [];

  constructor(
    private supervisorService: SupervisorService, 
    private messageService: MessageService, 
    private toastr: ToastrService, 
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadSupervisors();
  }

  toggleSection(section: string): void {
    this.visibleSections[section] = !this.visibleSections[section];
  }

  isSectionVisible(section: string): boolean {
    return this.visibleSections[section] || false;
  }

  // Guardar un nuevo supervisor
  saveSupervisor(): void {
    this.submitted = true;
    console.log(this.supervisor); // Imprimir valores actuales
    // Validación de los campos (asegúrate de que los campos sean completos)
    if (this.supervisor.nombre && this.supervisor.apellido && this.supervisor.emailPersona && this.supervisor.dni) {
      this.supervisorService.saveSupervisor(this.supervisor).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Supervisor guardado.' });
          this.isDialogVisible = false;
          this.loadSupervisors(); // Cargar la lista de supervisores después de guardar
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el supervisor.' });
          console.error('Error al guardar supervisor:', err);
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Todos los campos son obligatorios.' });
    }
  }

  // Cargar la lista de supervisores
  loadSupervisors(): void {
    this.supervisorService.getSupervisores().subscribe({
      next: (data) => this.supervisores2 = data,
      error: () => this.supervisores2 = []
    });
  }

  // Abrir el diálogo para agregar un supervisor
  openAddSupervisorDialog(): void {
    this.isDialogVisible = true;
    this.supervisor = { 
      nombre: '', 
      apellido: '', 
      emailPersona: '', 
      dni: '' 
    }; // Limpiar el formulario
    }

  // Abrir el diálogo para listar supervisores
  openListSupervisorsDialog(): void {
    this.isListDialogVisible = true;
  }

  closeDialog(): void {
    this.isDialogVisible = false;
  }

  // Eliminar un supervisor
  deleteSupervisor(supervisorId: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este supervisor?',
      accept: () => this.supervisorService.deleteSupervisor(supervisorId).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Supervisor eliminado.' });
          this.loadSupervisors();  // Recargar los supervisores después de eliminar
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el supervisor.' });
        }
      })
    });
  }  
  
    // Editar supervisor
    editSupervisor(supervisor: SupervisorDTO) {
      this.selectedSupervisor = { ...supervisor }; // Clonar datos para edición
      this.displayEditDialog = true; // Mostrar el cuadro de diálogo
    }

// Actualizar supervisor
updateSupervisor(): void {
  if (!this.selectedSupervisor) {
    console.error('No hay supervisor seleccionado para actualizar.');
    return;
  }

  this.supervisorService.updateSupervisor(this.selectedSupervisor).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Supervisor actualizado exitosamente.',
      });
      this.displayEditDialog = false; // Cierra el diálogo
      this.loadSupervisors(); // Recargar la lista de supervisores
    },
    error: (error) => {
      console.error('Error al actualizar el supervisor:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ocurrió un problema al actualizar el supervisor.',
      });
    },
  });
}


    // Cancelar edición
    cancelEdit() {
      this.displayEditDialog = false;
      this.selectedSupervisor = null; // Limpiar datos temporales
    }

}