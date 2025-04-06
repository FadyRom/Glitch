import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  onSubmit() {
    console.log('Signup submitted:', this.signupData);
  }
}
