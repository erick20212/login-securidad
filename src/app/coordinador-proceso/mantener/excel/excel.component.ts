import { Component } from '@angular/core';
<<<<<<< HEAD
import * as XLSX from 'xlsx'; // Importar librería XLSX
import { ExcelService } from '../../../core/services/ExcelService.service';
=======
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';  // Importar librería XLSX
import { ExcelService } from '../../../core/services/Excelservice.service';
>>>>>>> 36b179465f299f042f2a1b20d404f7fe5032cf5c

@Component({
  selector: 'app-excel',
  standalone: true,
  imports: [],
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent {
  selectedFile: File | null = null;
  excelData: any[] = []; // Variable para almacenar los datos del Excel
  successMessage: string = ''; // Mensaje de éxito
  errorMessage: string = ''; // Mensaje de error

  constructor(private excelService: ExcelService) {}

  // Función para gestionar el cambio de archivo
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.readExcel(file); // Llamar a la función para leer el archivo
    }
  }

  // Función para leer el archivo Excel y convertirlo a JSON
  readExcel(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Leer la primera hoja
      const sheet = workbook.Sheets[sheetName];
      this.excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convertir a formato JSON
    };
    reader.readAsArrayBuffer(file); // Leer el archivo como ArrayBuffer
  }

  // Función para subir el archivo al backend
  uploadFile(): void {
    this.clearMessages(); // Limpiar mensajes previos
    if (!this.selectedFile) {
      this.errorMessage = 'Por favor selecciona un archivo primero';
      return;
    }

    // Usar el servicio para enviar el archivo al backend
    this.excelService.procesarExcel(this.selectedFile).subscribe({
      next: () => {
        this.successMessage = 'Excel procesado correctamente';
      },
      error: (error) => {
        console.error('Error al cargar el archivo', error);
        this.errorMessage = 'Hubo un error al cargar el archivo';
      }
    });
  }

  // Limpiar mensajes
  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
