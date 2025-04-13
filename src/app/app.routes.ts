// import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { GamesComponent } from './games/games.component';
// import { SelectedGameComponent } from './games/selected-game/selected-game.component';
// import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';
// import { TrendingComponent } from './games/trending/trending.component';
// import { TopRatedComponent } from './games/top-rated/top-rated.component';
// import { UpcomingComponent } from './games/upcoming/upcoming.component';
// import { SearchComponent } from './search/search.component';
// import { NotFoundComponent } from './not-found/not-found.component';
// import { ProfileComponent } from './profile/profile.component';
// import { LibraryComponent } from './profile/library/library.component';
// import { WishlistComponent } from './profile/wishlist/wishlist.component';
// import { userStateGuard } from './user-state.guard';
// import { showProfileGuard } from './show-profile.guard';

// export const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent,
//   },
//   {
//     path: 'games',
//     component: GamesComponent,
//   },
//   {
//     path: 'games/trending',
//     component: TrendingComponent,
//   },
//   {
//     path: 'games/top-rated',
//     component: TopRatedComponent,
//   },
//   {
//     path: 'games/upcoming',
//     component: UpcomingComponent,
//   },
//   {
//     path: 'games/:selectedGameId',
//     component: SelectedGameComponent,
//   },

//   {
//     path: 'search/:searchTerm',
//     component: SearchComponent,
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//     canActivate: [userStateGuard],
//   },
//   {
//     path: 'signup',
//     component: SignupComponent,
//     canActivate: [userStateGuard],
//   },
//   {
//     path: 'profile',
//     component: ProfileComponent,
//     canActivate: [showProfileGuard],
//   },
//   {
//     path: 'profile/library',
//     component: LibraryComponent,
//     canActivate: [showProfileGuard],
//   },
//   {
//     path: 'profile/wishlist',
//     component: WishlistComponent,
//     canActivate: [showProfileGuard],
//   },
//   {
//     path: '**',
//     component: NotFoundComponent,
//   },
// ];
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { userStateGuard } from './user-state.guard';
import { showProfileGuard } from './show-profile.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./games/games.component').then((m) => m.GamesComponent),
  },
  {
    path: 'games/trending',
    loadComponent: () =>
      import('./games/trending/trending.component').then(
        (m) => m.TrendingComponent
      ),
  },
  {
    path: 'games/top-rated',
    loadComponent: () =>
      import('./games/top-rated/top-rated.component').then(
        (m) => m.TopRatedComponent
      ),
  },
  {
    path: 'games/upcoming',
    loadComponent: () =>
      import('./games/upcoming/upcoming.component').then(
        (m) => m.UpcomingComponent
      ),
  },
  {
    path: 'games/:selectedGameId',
    loadComponent: () =>
      import('./games/selected-game/selected-game.component').then(
        (m) => m.SelectedGameComponent
      ),
  },
  {
    path: 'search/:searchTerm',
    loadComponent: () =>
      import('./search/search.component').then((m) => m.SearchComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [userStateGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
    canActivate: [userStateGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [showProfileGuard],
  },
  {
    path: 'profile/library',
    loadComponent: () =>
      import('./profile/library/library.component').then(
        (m) => m.LibraryComponent
      ),
    canActivate: [showProfileGuard],
  },
  {
    path: 'profile/wishlist',
    loadComponent: () =>
      import('./profile/wishlist/wishlist.component').then(
        (m) => m.WishlistComponent
      ),
    canActivate: [showProfileGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
