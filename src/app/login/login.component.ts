import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  loginData = {
    email: '',
    password: '',
  };

  submitted = signal<boolean>(false);
  user = computed(() => this.authService.signInState());

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  onSubmit(form: NgForm) {
    this.submitted.set(true);

    if (form.valid) {
      this.authService.login(this.loginData.email, this.loginData.password);
      this.router.navigate(['/']);
    }
  }
}
