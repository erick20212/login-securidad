import { Component } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  template: `
    <div class="access-denied-container">
      <h1>Acceso Denegado</h1>
      <p>No tienes permisos para acceder a esta sección.</p>
      <a routerLink="/dashboard" class="btn">Volver al Dashboard</a>
    </div>
  `,
  styles: [`
    .access-denied-container {
      text-align: center;
      margin-top: 50px;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
  `]
})
export class AccessDeniedComponent {}