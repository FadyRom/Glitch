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
}
