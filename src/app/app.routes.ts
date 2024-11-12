// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProtectedComponent } from './features/protected/protected/protected.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CartaAceptacionComponent } from './estudiante-proceso/carta-aceptacion/carta-aceptacion.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'carta-aceptacion', component: CartaAceptacionComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];