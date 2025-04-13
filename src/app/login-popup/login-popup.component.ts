import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.css',
})
export class LoginPopupComponent {
  private authService = inject(AuthService);
  closePopup() {
    this.authService.showLoginPopup.set(false);
  }
}
