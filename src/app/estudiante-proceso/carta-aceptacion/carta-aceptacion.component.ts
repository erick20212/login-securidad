import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { Empresa } from '../../interfaces/empresa';
import { EmpresaService } from '../../core/services/empresa.service';
import { Linea } from '../../interfaces/linea';
import { LineaService } from '../../core/services/linea.service';

@Component({
  selector: 'app-carta-aceptacion',
  templateUrl: './carta-aceptacion.component.html',
  styleUrls: ['./carta-aceptacion.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CartaAceptacionComponent implements OnInit {
  studentData: any = {};  // Inicializa con un objeto vacío
  companyData: any = {};  // Inicializa con un objeto vacío
  companies: Empresa[] = [];
  careerLines: Linea[] = [];
  selectedCompany: number | null = null;
  selectedCareerLine: number | null = null;

  helpPhone: string = '994343419';
  helpEmail: string = 'support@example.com';
  showConfirmation: boolean = false; // Nueva propiedad para mostrar el mensaje de confirmación

  constructor(
    private http: HttpClient,
    private empresaService: EmpresaService,
    private lineaService: LineaService,
    private toastr: ToastrService // Inyectamos ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCompanies();
    this.loadCareerLines();
  }

  loadCompanies() {
    this.empresaService.getEmpresas().subscribe((data: Empresa[]) => {
      this.companies = data;
    });
  }

  loadCareerLines() {
    this.lineaService.getLineas().subscribe((data: Linea[]) => {
      this.careerLines = data;
    });
  }

  validateAndSubmit() {
    // Verificar si los datos del estudiante están completos
    const isStudentDataComplete = this.studentData.name && this.studentData.studentCode && this.studentData.dni && this.studentData.phone && this.studentData.email;

    // Verificar si se seleccionó empresa y línea de carrera
    const isCompanyAndCareerSelected = this.selectedCompany && this.selectedCareerLine;

    // Verificar si los datos de la empresa están completos
    const isCompanyDataComplete = this.companyData.name && this.companyData.ruc && this.companyData.address && this.companyData.phone;

    // Validar condiciones
    if (isStudentDataComplete && (isCompanyAndCareerSelected || isCompanyDataComplete)) {
      // Si se cumplen las condiciones, mostrar mensaje de confirmación y notificación de éxito
      this.showConfirmation = true;
      this.toastr.success('Datos enviados exitosamente.', 'Éxito');
    } else {
      // Mostrar alerta si no se cumplen las condiciones y notificación de error
      this.toastr.error('Por favor, complete los datos requeridos.', 'Error');
    }
  }
}
