import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { catchError, of } from 'rxjs';
import { ExcelComponent } from '../excel/excel.component';
import { SupervisorComponent } from '../supervisor/supervisor.component';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ExcelComponent,
    SupervisorComponent,
  ],
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'], // Cambiado a `styleUrls` (con "s"), ya que es un arreglo
})
export class PlanComponent {
  private readonly apiUrl = 'http://localhost:8080/api/'; // Cambia esto por la URL de tu API
  private visibleSections: { [key: string]: boolean } = {};

  isDialogVisible: boolean = false;
  isConfirmationVisible: boolean = false; // Flag para mostrar el diálogo de confirmación
  submitted: boolean = false; // Bandera para validar el formulario

  // Supervisor, Estudiante, Planes, Línea y Empresa
  supervisor = { nombre: '', apellido: '', email: '', dni: '' };
  estudiante = { nombre: '', apellido: '', email: '', dni: '', codigo: '' };
  planes = { nombre: '' };
  linea = { nombre: '' };
  empresa = { razonSocial: '', direccion: '', email: '', telefono: '' };

  // Variables de control de los diálogos
  isEstudianteDialogVisible: boolean = false;
  isEmpresaDialogVisible: boolean = false;
  isLineaDialogVisible: boolean = false;
  isPlanDialogVisible: boolean = false;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  // Lógica para mostrar y ocultar secciones
  toggleSection(section: string): void {
    this.visibleSections[section] = !this.visibleSections[section];
  }

  isSectionVisible(section: string): boolean {
    return this.visibleSections[section] || false;
  }

  // Lógica para guardar datos en el servidor
  saveData(endpoint: string, data: any, closeDialog: () => void): void {
    this.http.post(`${this.apiUrl}${endpoint}`, data).pipe(
      catchError((error) => {
        console.error(`Error guardando ${endpoint}:`, error);
        return of(null);
      })
    ).subscribe((response) => {
      if (response) {
        console.log(`${endpoint} guardado con éxito:`, response);
        closeDialog();
      }
    });
  }

  // Guardar supervisor
  saveSupervisor(): void {
    this.submitted = true;
    if (this.supervisor.nombre && this.supervisor.apellido && this.supervisor.email && this.supervisor.dni) {
      this.saveData('supervisores', this.supervisor, () => {
        this.isDialogVisible = false;
        this.isConfirmationVisible = false;
      });
    } else {
      console.log('Formulario de supervisor inválido');
    }
  }

  // Guardar estudiante
  saveEstudiante(): void {
    this.submitted = true;
    if (this.estudiante.nombre && this.estudiante.apellido && this.estudiante.email && this.estudiante.dni && this.estudiante.codigo) {
      this.saveData('estudiantes', this.estudiante, () => {
        this.isEstudianteDialogVisible = false;
      });
    } else {
      console.log('Formulario de estudiante inválido');
    }
  }

  // Lógica para seleccionar una opción
  selectOption(option: string): void {
    console.log(`Opción seleccionada: ${option}`);
  }

  // Diálogos de Supervisor
  openAddSupervisorDialog() {
    this.isDialogVisible = true;
  }

  closeDialog() {
    this.isDialogVisible = false;
    this.submitted = false;
  }

  // Confirmación
  openConfirmationDialog() {
    this.isConfirmationVisible = true;
  }

  closeConfirmation() {
    this.isConfirmationVisible = false;
  }

  // Diálogos de Estudiante
  openAddEstudianteDialog() {
    this.isEstudianteDialogVisible = true;
  }

  closeEstudianteDialog() {
    this.isEstudianteDialogVisible = false;
    this.submitted = false;
  }

  // Guardar Empresa
  openAddEmpresaDialog() {
    this.isEmpresaDialogVisible = true;
  }

  closeEmpresaDialog() {
    this.isEmpresaDialogVisible = false;
    this.submitted = false;
  }

  saveEmpresa(): void {
    if (this.empresa.razonSocial && this.empresa.direccion && this.empresa.email && this.empresa.telefono) {
      this.saveData('empresas', this.empresa, () => {
        this.isEmpresaDialogVisible = false;
      });
    } else {
      console.log('Formulario de empresa inválido');
    }
  }

  // Diálogos de Línea
  openAddLineaDialog() {
    this.isLineaDialogVisible = true;
  }

  closeLineaDialog() {
    this.isLineaDialogVisible = false;
    this.submitted = false;
  }

  saveLinea(): void {
    if (this.linea.nombre) {
      this.saveData('lineas', this.linea, () => {
        this.isLineaDialogVisible = false;
      });
    } else {
      console.log('Formulario de línea inválido');
    }
  }

  // Diálogos de Plan
  openAddPlanDialog() {
    this.isPlanDialogVisible = true;
  }

  closePlanDialog() {
    this.isPlanDialogVisible = false;
    this.submitted = false;
  }

  savePlan(): void {
    if (this.planes.nombre) {
      this.saveData('planes', this.planes, () => {
        this.isPlanDialogVisible = false;
      });
    } else {
      console.log('Formulario de plan inválido');
    }
  }
}
