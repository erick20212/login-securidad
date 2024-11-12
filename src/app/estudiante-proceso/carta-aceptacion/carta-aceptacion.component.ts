import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carta-aceptacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="carta-aceptacion-container p-4">
      <h2 class="text-2xl font-bold mb-4">Carta de Aceptación - Nuevo Proceso</h2>
      
      <form [formGroup]="cartaForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div class="form-group">
          <label for="nombreEmpresa" class="block text-sm font-medium mb-1">Nombre de la Empresa</label>
          <input 
            type="text" 
            id="nombreEmpresa"
            formControlName="nombreEmpresa"
            class="w-full p-2 border rounded-md"
            placeholder="Ingrese el nombre de la empresa"
          >
          <div *ngIf="cartaForm.get('nombreEmpresa')?.errors?.['required'] && cartaForm.get('nombreEmpresa')?.touched" 
               class="text-red-500 text-sm mt-1">
            El nombre de la empresa es requerido
          </div>
        </div>

        <div class="form-group">
          <label for="direccionEmpresa" class="block text-sm font-medium mb-1">Dirección de la Empresa</label>
          <input 
            type="text" 
            id="direccionEmpresa"
            formControlName="direccionEmpresa"
            class="w-full p-2 border rounded-md"
            placeholder="Ingrese la dirección de la empresa"
          >
          <div *ngIf="cartaForm.get('direccionEmpresa')?.errors?.['required'] && cartaForm.get('direccionEmpresa')?.touched" 
               class="text-red-500 text-sm mt-1">
            La dirección de la empresa es requerida
          </div>
        </div>

        <div class="form-group">
          <label for="contactoEmpresa" class="block text-sm font-medium mb-1">Nombre del Contacto</label>
          <input 
            type="text" 
            id="contactoEmpresa"
            formControlName="contactoEmpresa"
            class="w-full p-2 border rounded-md"
            placeholder="Ingrese el nombre del contacto en la empresa"
          >
          <div *ngIf="cartaForm.get('contactoEmpresa')?.errors?.['required'] && cartaForm.get('contactoEmpresa')?.touched" 
               class="text-red-500 text-sm mt-1">
            El nombre del contacto es requerido
          </div>
        </div>

        <div class="form-group">
          <label for="cargoContacto" class="block text-sm font-medium mb-1">Cargo del Contacto</label>
          <input 
            type="text" 
            id="cargoContacto"
            formControlName="cargoContacto"
            class="w-full p-2 border rounded-md"
            placeholder="Ingrese el cargo del contacto"
          >
          <div *ngIf="cartaForm.get('cargoContacto')?.errors?.['required'] && cartaForm.get('cargoContacto')?.touched" 
               class="text-red-500 text-sm mt-1">
            El cargo del contacto es requerido
          </div>
        </div>

        <div class="form-group">
          <label for="fechaInicio" class="block text-sm font-medium mb-1">Fecha de Inicio</label>
          <input 
            type="date" 
            id="fechaInicio"
            formControlName="fechaInicio"
            class="w-full p-2 border rounded-md"
          >
          <div *ngIf="cartaForm.get('fechaInicio')?.errors?.['required'] && cartaForm.get('fechaInicio')?.touched" 
               class="text-red-500 text-sm mt-1">
            La fecha de inicio es requerida
          </div>
        </div>

        <button 
          type="submit" 
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          [disabled]="cartaForm.invalid || isSubmitting"
        >
          {{ isSubmitting ? 'Enviando...' : 'Generar Carta de Aceptación' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .carta-aceptacion-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    input.ng-invalid.ng-touched {
      border-color: red;
    }
  `]
})
export class CartaAceptacionComponent {
  cartaForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.cartaForm = this.fb.group({
      nombreEmpresa: ['', [Validators.required]],
      direccionEmpresa: ['', [Validators.required]],
      contactoEmpresa: ['', [Validators.required]],
      cargoContacto: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.cartaForm.valid) {
      this.isSubmitting = true;
      
      // Aquí irá la lógica para enviar los datos al servidor
      console.log('Datos del formulario:', this.cartaForm.value);
      
      // Simulación de envío
      setTimeout(() => {
        this.toastr.success('Carta de aceptación generada correctamente', 'Éxito');
        this.isSubmitting = false;
        this.cartaForm.reset();
      }, 1500);
    } else {
      this.toastr.error('Por favor, complete todos los campos requeridos', 'Error');
      Object.keys(this.cartaForm.controls).forEach(key => {
        const control = this.cartaForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}