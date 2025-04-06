import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { SelectedGameComponent } from './games/selected-game/selected-game.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TrendingComponent } from './games/trending/trending.component';
import { TopRatedComponent } from './games/top-rated/top-rated.component';
import { UpcomingComponent } from './games/upcoming/upcoming.component';
import { EsportsComponent } from './esports/esports.component';
import { LayoutComponent } from './esports/layout/layout.component';
import { MatchComponent } from './esports/match/match.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'games',
    component: GamesComponent,
  },
  {
    path: 'games/trending',
    component: TrendingComponent,
  },
  {
    path: 'games/top-rated',
    component: TopRatedComponent,
  },
  {
    path: 'games/upcoming',
    component: UpcomingComponent,
  },
  {
    path: 'games/:selectedGameId',
    component: SelectedGameComponent,
  },
  {
    path: 'esports',
    component: EsportsComponent,
  },
  {
    path: 'esports/live',
    component: SignupComponent,
  },
  {
    path: 'esports/rankings',
    component: LoginComponent,
  },
  {
    path: 'esports/tournaments',
    component: EsportsComponent,
  },
  {
    path: 'esports/:esportType',
    component: MatchComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];
