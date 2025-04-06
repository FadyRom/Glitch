import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { rawgKey, rawgUrl } from '../enviroment';
import { Game, GameResponse, RawgApiResponse } from './interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RawgApiService {
  private rawgKey = rawgKey;
  private apiUrl = rawgUrl;
  private httpClient = inject(HttpClient);

  allGames = signal<Game[]>([]);
  trendingGamesArray = signal<Game[]>([]);
  topRatedGames = signal<Game[]>([]);
  upcomingGames = signal<Game[]>([]);
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
  loadingPage = signal<boolean>(false);

  getHomeGames() {
    this.loadingPage.set(true);
    const rawgKey = this.rawgKey;
    return this.httpClient
      .get<RawgApiResponse>(`${this.apiUrl}/games?key=${rawgKey}`)
      .pipe(
        tap({
          next: (res) => {
            this.allGames.set(res.results);
          },
          complete: () => this.loadingPage.set(false),
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

  trendingGames() {
    this.loadingPage.set(true);

    const rawgKey = this.rawgKey;
    const today = new Date();
    const pastDate = new Date();
    pastDate.setMonth(today.getMonth() - 4); // 4 months ago

    const formatDate = (date: Date): string => date.toISOString().split('T')[0]; // format as yyyy-mm-dd

    const startDate = formatDate(pastDate);
    const endDate = formatDate(today);

    return this.httpClient
      .get<RawgApiResponse>(
        `${this.apiUrl}/games?page_size=21&ordering=-added&dates=${startDate},${endDate}&key=${rawgKey}`
      )
      .pipe(
        tap({
          next: (res) => {
            this.trendingGamesArray.set(res.results);
          },
          complete: () => this.loadingPage.set(false),
        })
      );
  }

  topRated() {
    this.loadingPage.set(true);

    const today = new Date();
    const pastYear = new Date();
    pastYear.setFullYear(today.getFullYear() - 1); // One year ago from today

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const startDate = formatDate(pastYear);
    const endDate = formatDate(today);

    return this.httpClient
      .get<RawgApiResponse>(
        `${this.apiUrl}/games?page_size=21&ordering=-rating&dates=${startDate},${endDate}&key=${rawgKey}`
      )
      .pipe(
        tap({
          next: (res) => {
            this.topRatedGames.set(res.results);
          },
          complete: () => this.loadingPage.set(false),
        })
      );
  }

  upcoming() {
    this.loadingPage.set(true);

    const today = new Date();
    const future = new Date();
    future.setFullYear(today.getFullYear() + 1);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const startDate = formatDate(today);
    const endDate = formatDate(future);
    return this.httpClient
      .get<RawgApiResponse>(
        `${this.apiUrl}/games?page-size=21&dates=${startDate},${endDate}&ordering=-added&key=${rawgKey}`
      )
      .pipe(
        tap({
          next: (res) => {
            this.upcomingGames.set(res.results);
          },
          complete: () => this.loadingPage.set(false),
        })
      );
  }
}
