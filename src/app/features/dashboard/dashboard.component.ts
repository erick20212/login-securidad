import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterOutlet } from '@angular/router';

// Importaciones de Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faChartBar, faCog, faUsers, faFileAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterOutlet], // Importa FontAwesomeModule aquí
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  role: string = '';
  username: string = '';
  profileImage: string = '';

  // Declaración de los iconos
  faHome = faHome;
  faChartBar = faChartBar;
  faCog = faCog;
  faUsers = faUsers;
  faFileAlt = faFileAlt;
  faSignOutAlt = faSignOutAlt;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Obtener el rol y el nombre de usuario desde el AuthService
    this.role = this.authService.getUserRole();
    this.username = this.authService.getUsername();

    // Mensaje de depuración para confirmar el rol actual
    console.log('Role from AuthService:', this.role);

    // Asignar la imagen de perfil según el rol
    this.setProfileImage();
  }

  setProfileImage(): void {
    if (this.role === 'coordinador') {
      this.profileImage = 'https://img.freepik.com/fotos-premium/paloma-corbata-que-tiene-corbata_771335-50496.jpg';
    } else if (this.role === 'admin') {
      this.profileImage = 'https://img.freepik.com/fotos-premium/paloma-corbata-que-tiene-corbata_771335-50496.jpg';
    } else if (this.role === 'user') {
      this.profileImage = 'https://i.pinimg.com/originals/e7/fd/e7/e7fde7197f89cac7846e66ad629287cc.jpg';
    } else {
      console.warn('Unknown role, using default profile image');
      this.profileImage = 'https://i.pinimg.com/originals/e7/fd/e7/e7fde7197f89cac7846e66ad629287cc.jpg';
    }

    // Mensaje de depuración para confirmar la URL de la imagen de perfil
    console.log('Profile image URL assigned:', this.profileImage);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
