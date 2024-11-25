import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ExcelComponent } from "./excel/excel.component";
import { SupervisorComponent } from "./supervisor/supervisor.component";
import { EstudianteComponent } from "./estudiante/estudiante.component";
import { LineaComponent } from "./linea/linea.component";
import { PlanComponent } from "./plan/plan.component";

@Component({
  selector: 'app-mantener',
  standalone: true,
  imports: [CommonModule, DialogModule, InputTextModule, ButtonModule, FormsModule, ExcelComponent, SupervisorComponent, EstudianteComponent, LineaComponent, PlanComponent],
  templateUrl: './mantener.component.html',
  styleUrls: ['./mantener.component.css']
})
export class MantenerComponent {
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


  // Lógica para seleccionar una opción
  selectOption(option: string): void {
    console.log('Opción seleccionada: ${option}');
  }
}