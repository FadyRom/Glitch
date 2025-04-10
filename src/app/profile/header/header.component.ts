import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  user = computed(() => this.authService.signInState());
}
