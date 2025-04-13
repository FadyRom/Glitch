import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { RawgApiService } from '../../rawg-api.service';
import { GamesHeaderComponent } from '../games-header/games-header.component';
import { GamesListComponent } from '../../home/games-list/games-list.component';
import { Game } from '../../interfaces';
import { forkJoin, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../loading/loading.component';
import { ErrorComponent } from '../../error/error.component';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-selected-game',
  standalone: true,
  imports: [
    GamesHeaderComponent,
    GamesListComponent,
    LoadingComponent,
    ErrorComponent,
  ],
  templateUrl: './selected-game.component.html',
  styleUrl: './selected-game.component.css',
})
export class SelectedGameComponent implements OnInit {
  private rawgApiService = inject(RawgApiService);
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  private profileService = inject(ProfileService);

  selectedGameId = input.required<string>();
  game = computed(() => this.rawgApiService.selectedGameById());
  similarGames = signal<Game[]>([]);
  genreId: number[] = [];
  genreIdString: string = this.genreId.join(',');
  errorFetching = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.fetchInfo(params.get('selectedGameId'));
    });
    const sub = forkJoin([
      this.profileService.getGames('library'),
      this.profileService.getGames('wishlist'),
    ]).subscribe();

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
  fetchInfo(gameId: string) {
    this.isLoading.set(true);
    const sub = this.rawgApiService
      .getGameById(gameId)
      .pipe(
        tap((res) => {
          this.genreId = res.genres.map((genre) => genre.id);
          this.genreIdString = this.genreId.join(',');
        }),
        switchMap(() =>
          this.rawgApiService.getAllGames(1, '1,2,3', this.genreIdString)
        )
      )
      .subscribe({
        next: (res) => {
          this.similarGames.set(res.results);
          this.similarGames.set(
            this.similarGames().filter((game) => game.id !== this.game().id)
          );
        },
        complete: () => {
          this.isLoading.set(false);
        },
        error: () => {
          this.errorFetching.set(true);
          this.isLoading.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  gameInLibrary(game: Game) {
    return this.profileService.libraryGames().some((g) => g.id === game.id);
  }
  gameInWishlist(game: Game) {
    return this.profileService.wishlistGames().some((g) => g.id === game.id);
  }
}
