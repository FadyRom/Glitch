import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  showLoginPopup = signal(false);

  signInState = signal<User | null>(null);
  userId = signal<string | null>(localStorage.getItem('isLogged'));

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password).then(
      (user) => {
        this.signInState.set(user.user);
        localStorage.setItem('isLogged', user.user.uid);

        this.userId.set(localStorage.getItem('isLogged'));
      }
    );
  }

  async register(email: string, password: string, username: string) {
    return await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    ).then((userCredintial) => {
      const user = userCredintial.user;
      if (user) {
        updateProfile(user, {
          displayName: username,
        });
        this.signInState.set(user);
        localStorage.setItem('isLogged', user.uid);
        this.userId.set(localStorage.getItem('isLogged'));
      }
    });
  }

  checkAuthState() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        localStorage.setItem('isLogged', user.uid);

        this.signInState.set(user);
        this.userId.set(localStorage.getItem('isLogged'));
      }
    });
  }

  logout() {
    signOut(this.auth);
    this.signInState.set(null);
    localStorage.setItem('isLogged', 'false');
    location.reload();
    if (window.location.pathname.includes('/profile')) {
      this.router.navigate(['/']);
    }
  }
}
