import { Component, computed, inject, OnInit } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { GamesListComponent } from './games-list/games-list.component';
import { AbiosApiService } from '../rawg-api.service';
import { AsyncPipe } from '@angular/common';
import { TournamentsComponent } from './tournaments/tournaments.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    GamesListComponent,
    TournamentsComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private abiosApiService = inject(AbiosApiService);

  allGamesArray = computed(() => this.abiosApiService.allGames());

  getGamesSub$ = this.abiosApiService.getHomeGames();

  ngOnInit(): void {
    // this.abiosApiService.getAllGames().subscribe();
  }
}
