import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EmpresaDto, LineaCarreraDto, SolicitudDto } from '../../interfaces/solicitud-dto';
import { SolicitudService } from '../../core/services/solicitud.service';
import { SolicitudRenunciaComponent } from '../estado-proceso/solicitud-renuncia/solicitud-renuncia.component';


@Component({
  selector: 'app-carta-aceptacion',
  templateUrl: './carta-aceptacion.component.html',
  styleUrls: ['./carta-aceptacion.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, SolicitudRenunciaComponent],
})
export class CartaAceptacionComponent implements OnInit {
  solicitud: SolicitudDto | null = null;
  companies: EmpresaDto[] = [];
  careerLines: LineaCarreraDto[] = [];
  selectedCompany: number | null = null;
  selectedCareerLine: number | null = null;

  // Datos del estudiante (no editable)
  studentData = {
    name: '',
    studentCode: '',
    dni: '',
    phone: '',
    email: '',
  };

  // Datos de la empresa (editable si no se selecciona una empresa existente)
  companyData = {
    name: '',
    address: '',
    phone: '',
    email: '',
  };

  helpPhone: string = '994343419';
  helpEmail: string = 'support@example.com';
  showConfirmation: boolean = false; // Para mostrar el mensaje de confirmación

  constructor(
    private solicitudService: SolicitudService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {
    this.solicitudService.getDatosInicialesYSolicitudes().subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        this.solicitud = response.datosIniciales;
        this.companies = this.solicitud?.empresas || [];
        this.careerLines = this.solicitud?.lineasCarrera || [];

        if (this.solicitud?.estudiante) {
          this.studentData = {
            name: this.solicitud.estudiante.nombre || '',
            studentCode: this.solicitud.estudiante.codigo || '',
            dni: this.solicitud.estudiante.dni || '',
            phone: this.solicitud.estudiante.telefono || '',
            email: this.solicitud.estudiante.correo || '',
          };
        }
      },
      error: (error) => {
        console.error('Error al cargar datos iniciales:', error);
        this.toastr.error('Error al cargar los datos iniciales', 'Error');
      },
    });
  }

  onCompanySelected(): void {
    const selected = this.companies.find(
      (company) => company.id === Number(this.selectedCompany) // Comparar correctamente el ID seleccionado con los datos
    );
    
    if (selected) {
      // Si encuentra la empresa, actualiza los datos
      this.companyData = {
        name: selected.razonSocial || '',
        address: selected.direccion || '',
        phone: selected.telefono || '',
        email: selected.email || '',
      };
    } else {
      // Si no encuentra, resetea los datos
      this.resetCompanyData();
    }
  
    console.log('Empresa seleccionada para autocompletar:', selected);
  }

  validateAndSubmit(): void {
    const isCompanySelected = this.selectedCompany !== null;
    const isCareerLineSelected = this.selectedCareerLine !== null;
  
    if (!isCompanySelected || !isCareerLineSelected) {
      this.toastr.error('Debe seleccionar una empresa y una línea de carrera.', 'Error');
      return;
    }
  
    console.log('Empresa seleccionada:', this.selectedCompany);
    console.log('Línea de carrera seleccionada:', this.selectedCareerLine);
    console.log('Empresas disponibles:', this.companies);
    console.log('Líneas de carrera disponibles:', this.careerLines);
  
    // Encuentra la empresa y línea de carrera seleccionadas
    const selectedCompanyData = this.companies.find(
      (company) => company.id === Number(this.selectedCompany)
    );
    const selectedCareerLineData = this.careerLines.find(
      (line) => line.id === Number(this.selectedCareerLine)
    );
  
    if (!selectedCompanyData || !selectedCareerLineData) {
      console.error('Datos no encontrados:', {
        selectedCompanyData,
        selectedCareerLineData,
      });
      this.toastr.error(
        'Error al encontrar la empresa o la línea de carrera seleccionada.',
        'Error'
      );
      return;
    }
  
    // Preparar los datos de la solicitud
    const solicitudData: SolicitudDto = {
      id: this.solicitud?.id || null,
      estudiante: this.solicitud?.estudiante || null,
      empresa: selectedCompanyData,
      lineaCarrera: selectedCareerLineData,
      estado: 'pendiente',
      empresas: [],
      lineasCarrera: [],
    };
  
    console.log('Solicitud preparada para envío:', solicitudData);
  
    // Enviar la solicitud al backend
    this.solicitudService.saveSolicitud(solicitudData).subscribe({
      next: (response: any) => {
        console.log('Respuesta del servidor:', response);
        this.toastr.success(response.message, 'Éxito');
        this.showConfirmation = true;
        this.resetForm();
      },
      error: (error) => {
        console.error('Error al enviar la solicitud:', error);
        this.toastr.error(error.error?.error || 'Error al enviar la solicitud', 'Error');
      },
    });
  }

  private resetCompanyData(): void {
    this.companyData = { name: '', address: '', phone: '', email: '' };
    this.careerLines = this.solicitud?.lineasCarrera || [];
    this.selectedCareerLine = null;
  }

  private resetForm(): void {
    this.selectedCompany = null;
    this.selectedCareerLine = null;
    this.resetCompanyData();
    this.loadInitialData();
  }
}