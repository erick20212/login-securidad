import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  get username(): string {
    return this.authService.getUsername();
  }

  get role(): string {
    return this.authService.getUserRole();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
