import { Component, OnInit } from '@angular/core';
import { RolesEstadisticasService } from '../../core/services/RolesEstadisticasService.service';
import { CommonModule } from '@angular/common';
import { ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';  // Importa el módulo correcto

// Asegúrate de registrar los tipos de gráficos necesarios
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);  // Asegúrate de registrar estos elementos

@Component({
  selector: 'estadisticos',
  standalone: true,
  templateUrl: './estadisticos.component.html',
  styleUrls: ['./estadisticos.component.css'],
  imports: [
    CommonModule,
    NgChartsModule // Importa el módulo correcto
  ]
})
export class RolesEstadisticasComponent implements OnInit {
  isEstudianteVisible: boolean = true;  // Inicializado en 'true'

  rolesData: any[] = [];  // Cambiado a un array vacío, para evitar posibles problemas con objetos

  // Configuración del gráfico
  barChartLabels: string[] = [];  // Las etiquetas del gráfico, que son los roles
  barChartData: any[] = [];  // Los datos del gráfico, con las cantidades de roles
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLegend = true;
  barChartType: string = 'bar';  // Usamos un valor string directo ('bar')

  constructor(private rolesEstadisticasService: RolesEstadisticasService) { }

  ngOnInit(): void {
    this.loadRolesData();  // Cargar los datos cuando el componente se inicialice
  }

  loadRolesData(): void {
    this.rolesEstadisticasService.getRolesEstadisticas().subscribe(data => {
      console.log('Datos de roles recibidos:', data);
  
      // Convertir el objeto a un arreglo con la forma que necesitamos
      this.rolesData = Object.keys(data).map(key => ({
        nombre: key,
        cantidad: data[key],
      }));
  
      console.log('Datos transformados para el gráfico y la tabla:', this.rolesData);
      this.prepareChartData();  // Preparar los datos para el gráfico
    }, error => {
      console.error('Error al obtener los datos de roles:', error);
    });
  }
  
  prepareChartData(): void {
    // Si los datos son un objeto con claves como "Administrador", "Supervisor", etc.
    this.barChartLabels = this.rolesData.map(role => role.nombre);  // Las etiquetas del gráfico (nombres de los roles)
    this.barChartData = [
      {
        data: this.rolesData.map(role => role.cantidad),  // Los valores (cantidad de usuarios)
        label: 'Cantidad de Roles',
      },
    ];
  }

  toggleEstudianteVisibility(): void {
    this.isEstudianteVisible = !this.isEstudianteVisible;  // Alterna el valor de 'isEstudianteVisible'
  }
}
