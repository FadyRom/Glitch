import { Component, computed, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { GameGridComponent } from '../game-grid/game-grid.component';
import { RawgApiService } from '../../rawg-api.service';
import { AsyncPipe } from '@angular/common';
import { ErrorComponent } from '../../error/error.component';

@Component({
  selector: 'app-top-rated',
  standalone: true,
  imports: [HeaderComponent, GameGridComponent, AsyncPipe, ErrorComponent],
  templateUrl: './top-rated.component.html',
  styleUrl: './top-rated.component.css',
})
export class TopRatedComponent implements OnInit {
  private rawgApiService = inject(RawgApiService);

  topRatedGames = computed(() => this.rawgApiService.topRatedGames());
  topRatedSub$ = this.rawgApiService.topRated();
  ngOnInit(): void {}
}
