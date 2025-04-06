import { Component, computed, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RawgApiService } from '../../rawg-api.service';
import { GameGridComponent } from '../game-grid/game-grid.component';
import { AsyncPipe } from '@angular/common';
import { ErrorComponent } from '../../error/error.component';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [HeaderComponent, GameGridComponent, AsyncPipe, ErrorComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css',
})
export class TrendingComponent {
  private rawgApiService = inject(RawgApiService);

  trendingGames = computed(() => this.rawgApiService.trendingGamesArray());
  trendingGamesSub$ = this.rawgApiService.trendingGames();
}
