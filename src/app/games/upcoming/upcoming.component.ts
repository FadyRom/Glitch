import { AsyncPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RawgApiService } from '../../rawg-api.service';
import { GameGridComponent } from '../game-grid/game-grid.component';
import { ErrorComponent } from '../../error/error.component';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [HeaderComponent, GameGridComponent, AsyncPipe, ErrorComponent],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css',
})
export class UpcomingComponent {
  private rawgApiService = inject(RawgApiService);

  upcomingGames = computed(() => this.rawgApiService.upcomingGames());
  upcomingGamesSub$ = this.rawgApiService.upcoming();
}
