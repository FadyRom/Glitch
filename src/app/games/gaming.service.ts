import { inject, Injectable, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GamingService {
  router = inject(Router);

  genres = [
    { id: 4, name: 'Action' },
    { id: 51, name: 'Indie' },
    { id: 3, name: 'Adventure' },
    { id: 5, name: 'RPG' },
    { id: 10, name: 'Strategy' },
    { id: 2, name: 'Shooter' },
    { id: 40, name: 'Casual' },
    { id: 14, name: 'Simulation' },
    { id: 7, name: 'Puzzle' },
    { id: 11, name: 'Arcade' },
    { id: 83, name: 'Platformer' },
    { id: 1, name: 'Racing' },
    { id: 59, name: 'Massively Multiplayer' },
    { id: 15, name: 'Sports' },
    { id: 6, name: 'Fighting' },
    { id: 19, name: 'Family' },
    { id: 28, name: 'Board Games' },
    { id: 34, name: 'Educational' },
    { id: 17, name: 'Card' },
  ];
  platforms = ['Playstation', 'XBOX', 'PC'];

  applyPlatformFilters(selectedPlatforms: string[], currentPage: number) {
    let platformParams: number[] = [];
    if (selectedPlatforms.includes('PC')) {
      platformParams.push(1);
    }
    if (selectedPlatforms.includes('XBOX')) {
      platformParams.push(3);
    }
    if (selectedPlatforms.includes('Playstation')) {
      platformParams.push(2);
    }
    // If no platforms are selected, remove 'platform' from query params
    const queryParams = platformParams.length
      ? { page: currentPage, platform: platformParams.join(',') }
      : { page: currentPage };

    this.router.navigate(['/games'], {
      queryParams,
      queryParamsHandling: platformParams.length ? 'merge' : undefined, // Only merge if there are platform params
    });
  }

  applyGenreFilters(selectedGenres: string[], currentPage: number) {
    let genreParams: number[] = [];

    // Map selected genre names to their corresponding IDs
    this.genres.forEach((genre) => {
      if (selectedGenres.includes(genre.name)) {
        genreParams.push(genre.id);
      }
    });

    // If no genres are selected, remove 'genre' from query params
    const queryParams = genreParams.length
      ? { page: currentPage, genre: genreParams.join(',') }
      : { page: currentPage };

    this.router.navigate(['/games'], {
      queryParams,
      queryParamsHandling: genreParams.length ? 'merge' : undefined, // Only merge if genres exist
    });
  }
}
