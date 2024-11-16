import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Obtener el rol del usuario
    const userRole = this.authService.getUserRole();

    // Verificar si el rol del usuario está en los roles permitidos para la ruta
    const allowedRoles = route.data['roles'] as Array<string>;
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      // Redirigir si el rol del usuario no está permitido
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
