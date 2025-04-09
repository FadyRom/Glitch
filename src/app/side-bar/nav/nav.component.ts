import { Component, computed, inject, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  showSide = output<boolean>();
  loginState = computed(() => this.authService.signInState());

  sideState() {
    this.showSide.emit(true);
  }

  searchGame(searchTerm: string) {
    this.router.navigate(['search/', searchTerm]);
  }
}
