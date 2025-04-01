import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { rawgKey, url } from '../enviroment';
import { Game, RawgApiResponse } from './interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbiosApiService {
  private rawgKey = rawgKey;
  private apiUrl = url;
  allGames = signal<Game[]>([]);

  private httpClient = inject(HttpClient);

  getHomeGames() {
    const rawgKey = this.rawgKey;
    return this.httpClient
      .get<RawgApiResponse>(`${this.apiUrl}/games?key=${rawgKey}`)
      .pipe(
        tap({
          next: (res) => this.allGames.set(res.results),
        })
      );
  }

  getAllGames(
    page: number = 1,
    parentPlatforms: string = '1,2,3',
    genre = [
      4, // Action
      51, // Indie
      3, // Adventure
      5, // RPG
      10, // Strategy
      2, // Shooter
      40, // Casual
      14, // Simulation
      7, // Puzzle
      11, // Arcade
      83, // Platformer
      1, // Racing
      59, // Massively Multiplayer
      15, // Sports
      6, // Fighting
      19, // Family
      28, // Board Games
      34, // Educational
      17, // Card
    ]
  ) {
    const rawgKey = this.rawgKey;
    return this.httpClient
      .get<RawgApiResponse>(
        `${
          this.apiUrl
        }/games?page=${page}&page_size=21&parent_platforms=${parentPlatforms}&genres=${genre.join(
          ','
        )}&key=${rawgKey}`
      )
      .pipe(
        tap({
          next: (res) => this.allGames.set(res.results),
        })
      );
  }
}
