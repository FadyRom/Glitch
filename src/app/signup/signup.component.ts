import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  signupData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  submitted = signal<boolean>(false);
  passwordMismatch = signal<boolean>(false);
  user = computed(() => this.authService.signInState());

  ngOnInit(): void {
    if (this.user()) {
      this.router.navigate(['/']);
    }
  }

  // Custom validation methods
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    return password.length >= 8;
  }
  onSubmit(form: NgForm) {
    this.submitted.set(true);

    if (form.valid) {
      if (this.signupData.password !== this.signupData.confirmPassword) {
        this.passwordMismatch.set(true);
        return;
      }

      this.passwordMismatch.set(false);
      this.authService.register(
        this.signupData.email,
        this.signupData.password,
        this.signupData.username
      );
    }
  }
}
