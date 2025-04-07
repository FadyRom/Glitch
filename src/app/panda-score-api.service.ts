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

  matchData = signal<MatchResponse[]>([]);

  getData(gameName: string, dataType: string, dataStatus: string = 'upcoming') {
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
