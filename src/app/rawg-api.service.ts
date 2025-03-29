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

  getAllGames() {
    const rawgKey = this.rawgKey;
    return this.httpClient
      .get<RawgApiResponse>(`${this.apiUrl}/games?key=${rawgKey}`)
      .pipe(
        tap({
          next: (res) => this.allGames.set(res.results),
        })
      );
  }
}
