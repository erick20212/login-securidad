import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitudDto } from '../../interfaces/solicitud-dto';
import { SolicitudService } from '../../core/services/solicitud.service';



@Component({
  selector: 'app-lista-procesos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-procesos.component.html',
  styleUrls: ['./lista-procesos.component.css']
})
export class ListaProcesosComponent implements OnInit {
  solicitudes: SolicitudDto[] = [];
  loading: boolean = true;

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    // Consumir el endpoint para obtener las solicitudes del estudiante autenticado
    this.solicitudService.getSolicitudesDelEstudiante().subscribe(
      (data) => {
        this.solicitudes = data; // Asignamos las solicitudes obtenidas
        this.loading = false; // Cambiamos el estado de carga
      },
      (error) => {
        console.error('Error al obtener las solicitudes del estudiante autenticado', error);
        this.loading = false; // En caso de error cambiamos el estado de carga
      }
    );
  }
}