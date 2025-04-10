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
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  signInState = signal<User | null>(null);

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password).then(
      (user) => {
        this.signInState.set(user.user);
        localStorage.setItem('isLogged', 'true');
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
      }
    });
  }

  checkAuthState() {
    onAuthStateChanged(this.auth, (user) => {
      this.signInState.set(user);
    });
  }

  logout() {
    signOut(this.auth);
    this.signInState.set(null);
    localStorage.setItem('isLogged', 'false');
    if (
      window.location.pathname == '/profile' ||
      '/profile/library' ||
      '/profile/wishlist'
    ) {
      this.router.navigate(['/']);
    }
  }
}
