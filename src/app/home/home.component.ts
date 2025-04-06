import { Component, computed, inject, OnInit } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { GamesListComponent } from './games-list/games-list.component';
import { RawgApiService } from '../rawg-api.service';
import { AsyncPipe } from '@angular/common';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    GamesListComponent,
    TournamentsComponent,
    AsyncPipe,
    ErrorComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private RawgApiService = inject(RawgApiService);

  allGamesArray = computed(() => this.RawgApiService.allGames());

  getGamesSub$ = this.RawgApiService.getHomeGames();

  ngOnInit(): void {
    // this.RawgApiService.getAllGames().subscribe();
  }
}
