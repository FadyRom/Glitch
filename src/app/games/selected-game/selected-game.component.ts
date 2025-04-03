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
import { HeaderComponent } from '../../header/header.component';
import { GamesHeaderComponent } from '../games-header/games-header.component';
import { GamesListComponent } from '../../home/games-list/games-list.component';
import { Game } from '../../interfaces';
import { switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-selected-game',
  standalone: true,
  imports: [GamesHeaderComponent, GamesListComponent, AsyncPipe],
  templateUrl: './selected-game.component.html',
  styleUrl: './selected-game.component.css',
})
export class SelectedGameComponent implements OnInit {
  private rawgApiService = inject(RawgApiService);
  private destroyRef = inject(DestroyRef);

  selectedGameId = input.required<string>();
  game = computed(() => this.rawgApiService.selectedGameById());
  similarGames = signal<Game[]>([]);
  genreId: number[] = [];
  genreIdString: string = this.genreId.join(',');

  ngOnInit(): void {
    const sub = this.rawgApiService
      .getGameById(this.selectedGameId())
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
          console.log(res);
        },
      });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
