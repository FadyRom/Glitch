import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { SelectedGameComponent } from './games/selected-game/selected-game.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TrendingComponent } from './games/trending/trending.component';
import { TopRatedComponent } from './games/top-rated/top-rated.component';
import { UpcomingComponent } from './games/upcoming/upcoming.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
    path: 'search/:searchTerm',
    component: SearchComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
