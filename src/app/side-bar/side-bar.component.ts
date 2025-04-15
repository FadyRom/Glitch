import { Component, computed, inject, signal } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [NavComponent, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  private authService = inject(AuthService);
  user = computed(() => this.authService.signInState());

  sideState = computed(() => this.authService.sidebarState());
  showSide(event: boolean) {
    this.authService.sidebarState.set(event);
  }
  showSide2() {
    this.authService.sidebarState.set(!this.sideState());
  }

  logout() {
    this.authService.logout();
  }
}
