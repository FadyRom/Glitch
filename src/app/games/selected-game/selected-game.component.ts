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
import { switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../loading/loading.component';
import { ErrorComponent } from '../../error/error.component';

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
}
