import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Glitch';

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const routerSub = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });

    this.authService.checkAuthState();
    console.log(this.authService.signInState());
    this.destroyRef.onDestroy(() => routerSub.unsubscribe());
  }
}
