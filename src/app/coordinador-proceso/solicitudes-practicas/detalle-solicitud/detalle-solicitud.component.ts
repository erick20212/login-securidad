import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Proceso {
  nombre: string;
  codigo: string;
  empresa: string;
  ruc: string;
  estado: string;
}
@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  imports: [],
  templateUrl: './detalle-solicitud.component.html',
  styleUrl: './detalle-solicitud.component.css'
})
export class DetalleSolicitudComponent {
  @Input() proceso!: Proceso;
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.cerrar.emit();
  }
}
