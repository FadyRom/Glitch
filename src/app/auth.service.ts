import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  signInState = signal<any>(null);

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then(
      (user) => {
        this.signInState.set(user);
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
      if (user) {
        this.signInState.set(user);
      }
    });
  }

  logout() {
    signOut(this.auth);
    this.signInState.set(null);
  }
}
