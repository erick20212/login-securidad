import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carta-aceptacion',
  templateUrl: './carta-aceptacion.component.html',
  styleUrls: ['./carta-aceptacion.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CartaAceptacionComponent implements OnInit {
  studentData: any = {};  // Datos del estudiante
  companyData: any = {};  // Datos de la empresa nueva (opcional)
  companies: any[] = [];  // Empresas cargadas desde el backend
  careerLines: any[] = [];  // Líneas de carrera cargadas desde el backend
  selectedCompany: number | null = null;
  selectedCareerLine: number | null = null;

  helpPhone: string = '994343419';
  helpEmail: string = 'support@example.com';
  showConfirmation: boolean = false; // Para mostrar el mensaje de confirmación

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }
  
  loadInitialData() {
    this.http.get<any>('http://localhost:8080/api/solicitud/inicial').subscribe(
      (data) => {
        this.companies = data.empresas;
        this.careerLines = data.lineasCarrera;
      },
      (error) => {
        this.toastr.error('Error al cargar los datos iniciales', 'Error');
        console.error(error);
      }
    );
  }

  validateAndSubmit() {
    // Validar los datos
    const isStudentDataComplete = this.studentData.name && this.studentData.studentCode && this.studentData.dni && this.studentData.phone && this.studentData.email;
    const isCompanyAndCareerSelected = this.selectedCompany && this.selectedCareerLine;
    const isCompanyDataComplete = this.companyData.name && this.companyData.ruc && this.companyData.address && this.companyData.phone;
  
    if (isStudentDataComplete && (isCompanyAndCareerSelected || isCompanyDataComplete)) {
      // Preparar los datos para enviar
      const solicitudData = {
        estudiante: {
          codigo: this.studentData.studentCode, // Aquí pasamos el código del estudiante
          nombre: this.studentData.name
        },
        idEmpresa: this.selectedCompany,
        idLineaCarrera: this.selectedCareerLine,
        nombreEmpresa: this.companyData.name || null,
        rucEmpresa: this.companyData.ruc || null,
        direccionEmpresa: this.companyData.address || null,
        telefonoEmpresa: this.companyData.phone || null,
        correoEmpresa: this.companyData.email || null,
      };
  
      // Enviar los datos al backend
      this.http.post('http://localhost:8080/api/solicitud/inicial', solicitudData).subscribe(
        () => {
          this.showConfirmation = true;
          this.toastr.success('Datos enviados exitosamente', 'Éxito');
        },
        (error) => {
          this.toastr.error('Error al enviar la solicitud', 'Error');
          console.error(error);
        }
      );
    } else {
      this.toastr.error('Por favor, complete los datos requeridos', 'Error');
    }
  }
}