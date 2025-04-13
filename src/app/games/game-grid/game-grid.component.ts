import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '../../interfaces';
import { ProfileService } from '../../profile.service';
import { AuthService } from '../../auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-game-grid',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.css',
})
export class GameGridComponent {
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  games = input.required<Game[]>();
  libraryGames = computed(() => this.profileService.libraryGames());
  wishlistGames = computed(() => this.profileService.wishlistGames());

  ngOnInit() {
    const sub = forkJoin([
      this.profileService.getGames('library'),
      this.profileService.getGames('wishlist'),
    ]).subscribe();

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  ngAfterContentChecked(): void {}

  bookmarkGame(game: Game) {
    this.profileService.addToProfile(game, 'library').subscribe({
      next: (res) => console.log(res),
    });
  }

  wishlistGame(game: Game) {
    this.profileService.addToProfile(game, 'wishlist').subscribe({
      next: (res) => console.log(res),
    });
  }

  gameInLibrary(game: Game) {
    return this.profileService.libraryGames().some((g) => g.id === game.id);
  }
  gameInWishlist(game: Game) {
    return this.profileService.wishlistGames().some((g) => g.id === game.id);
  }
}
