import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Verificar si el usuario está autenticado
    if (!this.authService.isAuthenticated()) {
      console.warn('Acceso denegado: Usuario no autenticado.');
      this.router.navigate(['/login']);
      return false;
    }

    // Obtener el rol del usuario
    const userRole = this.authService.getUserRole();
    const allowedRoles = route.data['roles'] as Array<string>;

    // Verificar si el rol del usuario está en los roles permitidos
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      console.warn(`Acceso denegado: Usuario con rol "${userRole}" no permitido para esta ruta.`);
      this.router.navigate(['/access-denied']); // Redirigir a la página de acceso denegado
      return false;
    }

    // Acceso permitido
    return true;
  }
}