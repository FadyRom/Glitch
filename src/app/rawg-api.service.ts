import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { rawgKey, url } from '../enviroment';
import { Game, GameResponse, RawgApiResponse } from './interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RawgApiService {
  private rawgKey = rawgKey;
  private apiUrl = url;
  private httpClient = inject(HttpClient);

  allGames = signal<Game[]>([]);
  selectedGameById = signal<GameResponse>({
    id: 0,
    name: '',
    name_original: '',
    slug: '',
    released: '',
    background_image: '',
    background_image_additional: '',
    rating: 0,
    rating_top: 0,
    ratings: [],
    ratings_count: 0,
    added: 0,
    playtime: 0,
    suggestions_count: 0,
    metacritic: 0,
    metacritic_url: '',
    genres: [],
    parent_platforms: [],
    platforms: [],
    stores: [],
    tags: [],
    website: '',
    description: '',
    description_raw: '',
    reddit_url: '',
    reddit_count: 0,
    developers: [],
    publishers: [],
    achievements_count: 0,
    additions_count: 0,
    alternative_names: [],
    game_series_count: 0,
    movies_count: 0,
    screenshots_count: 0,
    tba: false,
    updated: '',
  });

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
    genre = '4,51,3,5,10,2,40,14,7,11,83,1,59,15,6,19,28,34,17'
  ) {
    const rawgKey = this.rawgKey;
    return this.httpClient
      .get<RawgApiResponse>(
        `${this.apiUrl}/games?page=${page}&page_size=21&parent_platforms=${parentPlatforms}&genres=${genre}&key=${rawgKey}`
      )
      .pipe(
        tap({
          next: (res) => this.allGames.set(res.results),
        })
      );
  }

  getGameById(id: string) {
    const rawgKey = this.rawgKey;
    return this.httpClient
      .get<GameResponse>(`${this.apiUrl}/games/${id}?key=${rawgKey}`)
      .pipe(
        tap({
          next: (res) => this.selectedGameById.set(res),
        })
      );
  }
}
