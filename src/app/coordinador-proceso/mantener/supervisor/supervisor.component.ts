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
  selectedSupervisor: SupervisorDTO | null = null;

  // Usamos PersonaUsuarioDTO solo para insertar un nuevo supervisor
  supervisor: PersonaUsuarioDTO = {
    nombre: '',
    apellido: '',
    email: '',
    dni: ''
  };

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

    if (this.supervisor.nombre && this.supervisor.apellido && this.supervisor.email && this.supervisor.dni) {
      this.supervisorService.saveSupervisor(this.supervisor).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Supervisor guardado.' });
          this.isDialogVisible = false;
          this.loadSupervisors();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el supervisor.' });
        }
      });
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
    this.supervisor = { nombre: '', apellido: '', email: '', dni: '' }; // Limpiar el formulario
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

  editSupervisor(supervisor: SupervisorDTO): void {
    this.selectedSupervisor = supervisor;
    this.supervisor = {
        id: supervisor.id,         // Incluye el ID para actualizaciones
        nombre: supervisor.nombre,
        apellido: supervisor.apellido,
        email: supervisor.email, // Ajustar para PersonaUsuarioDTO
        dni: supervisor.dni
    };
    this.isDialogVisible = true;
}
  
  
}