import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './auth.service';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SideBarComponent,
    FooterComponent,
    ErrorPopupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Glitch';

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);

  errorAdding = computed(() => this.profileService.errorAdding());
  ngOnInit(): void {
    localStorage.setItem('isLogged', 'false');
    const routerSub = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });

    this.authService.checkAuthState();
    this.destroyRef.onDestroy(() => routerSub.unsubscribe());
  }
}
