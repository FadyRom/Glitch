import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { Game } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { firebaseConfig } from '../enviroment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);
  errorAdding = signal<boolean>(false);

  user = computed(() => this.authService.signInState());
  libraryGames = signal<Game[]>([]);
  wishlistGames = signal<Game[]>([]);
  userId = computed(() => this.authService.userId());

  addToProfile(game: Game, place: 'library' | 'wishlist') {
    const lib = this.libraryGames();
    const wl = this.wishlistGames();

    if (place === 'library') {
      if (this.libraryGames().some((gameId) => gameId.id === game.id)) {
        this.libraryGames.set(
          this.libraryGames().filter((g) => g.id !== game.id)
        );
      } else {
        this.libraryGames.update((prev) => [...prev, game]);
      }
      return this.httpClient
        .put<Game[]>(
          `https://glitch-10150-default-rtdb.firebaseio.com/library/${this.userId()}/games.json?auth=${
            firebaseConfig.apiKey
          }`,
          this.libraryGames()
        )
        .pipe(
          tap({
            error: (err) => {
              this.libraryGames.set(lib);
              this.errorAdding.set(true);
              setTimeout(() => {
                this.errorAdding.set(false);
              }, 3000);
            },
          })
        );
    } else {
      if (this.wishlistGames().some((gameId) => gameId.id === game.id)) {
        this.wishlistGames.set(
          this.wishlistGames().filter((g) => g.id !== game.id)
        );
      } else {
        this.wishlistGames.update((prev) => [...prev, game]);
      }
      return this.httpClient
        .put<Game[]>(
          `https://glitch-10150-default-rtdb.firebaseio.com/wishlist/${this.userId()}/games.json?auth=${
            firebaseConfig.apiKey
          }`,
          this.wishlistGames()
        )
        .pipe(
          tap({
            error: (err) => {
              this.wishlistGames.set(wl);
              this.errorAdding.set(true);
              setTimeout(() => {
                this.errorAdding.set(false);
              }, 3000);
            },
          })
        );
    }
  }

  getGames(place: 'library' | 'wishlist') {
    return this.httpClient
      .get<{ games: Game[] }>(
        `https://glitch-10150-default-rtdb.firebaseio.com/${place}/${this.userId()}.json?auth=${
          firebaseConfig.apiKey
        }`
      )
      .pipe(
        tap({
          next: (res) => {
            if (place === 'library') {
              this.libraryGames.set(res.games);
              console.log(this.libraryGames());
            } else {
              this.wishlistGames.set(res.games);
              console.log(this.wishlistGames());
            }
          },
          error: (err) => {},
        })
      );
  }
}
