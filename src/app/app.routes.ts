import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CartaAceptacionComponent } from './estudiante-proceso/carta-aceptacion/carta-aceptacion.component';
import { ListaProcesosComponent } from './estudiante-proceso/lista-procesos/lista-procesos.component';
import { RegistroPracticasComponent } from './estudiante-proceso/registro-practicas/registro-practicas.component';
import { SolicitudesPracticasComponent } from './coordinador-proceso/solicitudes-practicas/solicitudes-practicas.component';
import { DetalleSolicitudComponent } from './coordinador-proceso/solicitudes-practicas/detalle-solicitud/detalle-solicitud.component';
import { ListaSolicitudesAprobadasComponent } from './coordinador-proceso/lista-solicitudes-aprobadas/lista-solicitudes-aprobadas.component';
import { DetalleAprobacionComponent } from './coordinador-proceso/lista-solicitudes-aprobadas/detalle-aprobacion/detalle-aprobacion.component';
import { EstadoProcesoComponent } from './estudiante-proceso/estado-proceso/estado-proceso.component';
import { SolicitudRenunciaComponent } from './estudiante-proceso/estado-proceso/solicitud-renuncia/solicitud-renuncia.component';
import { ListasSolicitudesAprobadasComponent } from './supervisor-proceso/lista-solicitudes-aprobadas/listas-solicitudes-aprobadas.component';
import { InformeFinalComponent } from './estudiante-proceso/informe-final/informe-final.component';
import { ListaInformesPracticasComponent } from './supervisor-proceso/lista-informes-practicas/lista-informes-practicas.component';
import { InformeDetalleComponent } from './supervisor-proceso/lista-informes-practicas/informe-detalle/informe-detalle.component';
import { ListaHorasCompletasComponent } from './estudiante-proceso/lista-horas-completas/lista-horas-completas.component';
import { AccessDeniedComponent } from './core/guards/access-denied.component';
import { RolesEstadisticasComponent } from './coordinador-proceso/estadisticos/estadisticos.component';
import { Mantener } from './coordinador-proceso/mantener/mantener.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'carta-aceptacion', 
        component: CartaAceptacionComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['estudiante'] } 
      },
      { 
        path: 'lista-procesos', 
        component: ListaProcesosComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['estudiante'] } 
      },
      { 
        path: 'registro-practicas', 
        component: RegistroPracticasComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['estudiante'] } 
      },
      { 
        path: 'estado-proceso', 
        component: EstadoProcesoComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['estudiante'] } 
      },
      { 
        path: 'estado-proceso/id', 
        component: SolicitudRenunciaComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['estudiante'] } 
      },
      { 
        path: 'informe-final', 
        component: InformeFinalComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['estudiante'] } 
      },
      { 
        path: 'lista-horas-completas', 
        component: ListaHorasCompletasComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['estudiante'] } 
      },
      { 
        path: 'lista-solicitudes', 
        component: SolicitudesPracticasComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['coordinador'] } 
      },
      { 
        path: 'lista-solicitudes/id', 
        component: DetalleSolicitudComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['coordinador'] } 
      },

      { 
        path: 'lista-solicitudes-aprobadas', 
        component: ListaSolicitudesAprobadasComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['coordinador'] } 
      },
      { 
        path: 'lista-solicitudes-aprobadas/id', 
        component: DetalleAprobacionComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['coordinador'] } 
      },
      { 
        path: 'mantener', 
        component: Mantener, 
        canActivate: [AuthGuard], 
        data: { roles: ['coordinador'] } 
      },
      { 
        path: 'estadistico', 
        component: RolesEstadisticasComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['coordinador'] } 
      },
      { 
        path: 'listas-solicitudes-aprobadas', 
        component: ListasSolicitudesAprobadasComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['supervisor'] } 
      },
      { 
        path: 'lista-informes-practicas', 
        component: ListaInformesPracticasComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['supervisor'] } 
      },
      { 
        path: 'lista-informes-practicas/id', 
        component: InformeDetalleComponent, 
        canActivate: [AuthGuard], 
        data: { roles: ['supervisor'] } 
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];