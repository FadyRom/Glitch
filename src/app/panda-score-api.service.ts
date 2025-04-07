import { inject, Injectable, signal } from '@angular/core';
import { pandaScore, pandaScoreKey } from '../enviroment';
import { HttpClient } from '@angular/common/http';
import { MatchResponse } from '../app/panda-score-interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PandaScoreApiService {
  private url = pandaScore;
  private httpClient = inject(HttpClient);

  loadingPage = signal<boolean>(false);
  matchData = signal<MatchResponse[]>([]);

  getData(gameName: string, dataType: string, dataStatus: string = 'upcoming') {
    this.loadingPage.set(true);
    return this.httpClient
      .get<MatchResponse[]>(
        `${this.url}/${gameName}/${dataType}/${dataStatus}`,
        {
          headers: {
            Authorization: pandaScoreKey,
          },
        }
      )
      .pipe(
        tap({
          next: (res) => {
            this.matchData.set(res);
            this.loadingPage.set(false);
          },
          error: () => {
            this.loadingPage.set(false);
          },
        })
      );
  }

  // getTournaments(gameName: string) {
  //   return this.httpClient.get(`${this.url}/${gameName}/tournaments`, {
  //     headers: {
  //       Authorization: pandaScoreKey,
  //     },
  //   });
  // }

  // getMatches(gameName: string) {
  //   return this.httpClient.get(`${this.url}/${gameName}/matches`, {
  //     headers: {
  //       Authorization: pandaScoreKey,
  //     },
  //   });
  // }

  // getPlayers(gameName: string) {
  //   return this.httpClient.get(`${this.url}/${gameName}/players`, {
  //     headers: {
  //       Authorization: pandaScoreKey,
  //     },
  //   });
  // }

  // getTeams(gameName: string) {
  //   return this.httpClient.get(`${this.url}/${gameName}/teams`, {
  //     headers: {
  //       Authorization: pandaScoreKey,
  //     },
  //   });
  // }
}
