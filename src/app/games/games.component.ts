import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AbiosApiService } from '../rawg-api.service';
import { Game } from '../interfaces';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../paginator/paginator.component';
import { LoadingComponent } from '../loading/loading.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [HeaderComponent, FormsModule, PaginatorComponent, LoadingComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent implements OnInit {
  private rawgApiService = inject(AbiosApiService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  games = signal<Game[]>([]);
  isLoading = signal(true);

  platforms = ['Playstation', 'XBOX', 'PC'];
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
  currentPage = signal<number>(1);
  totalPages = signal<number>(1000);
  selectedPlatforms: string[] = [];
  selectedGenres: string[] = [];
  priceRange: number = 14;

  ngOnInit(): void {
    const routeSub = this.route.queryParams.subscribe({
      next: (params) => {
        this.currentPage.set(params['page'] ? Number(params['page']) : 1);
        this.fetchGames(this.currentPage());
        if (this.currentPage() > this.totalPages()) {
          this.currentPage.set(this.totalPages());
          this.router.navigate(['/games'], {
            queryParams: { page: this.currentPage() },
            queryParamsHandling: 'merge', // Keeps existing query params
          });
        } else {
          this.fetchGames(this.currentPage());
        }
      },
    });

    this.destroyRef.onDestroy(() => {
      routeSub.unsubscribe();
    });
  }

  private fetchGames(page: number = 1) {
    const sub = this.rawgApiService.getAllGames(page, 21).subscribe({
      next: (res) => {
        this.isLoading.set(true);
        this.games.set(res.results);
      },
      complete: () => {
        setTimeout(() => {
          this.isLoading.set(false);
        }, 2000);
      },
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  togglePlatform(platform: string) {
    const index = this.selectedPlatforms.indexOf(platform);
    if (index === -1) {
      this.selectedPlatforms.push(platform);
    } else {
      this.selectedPlatforms.splice(index, 1);
    }
  }

  toggleGenre(genre: number) {
    const index = this.selectedGenres.indexOf(String(genre));
    if (index === -1) {
      this.selectedGenres.push(String(genre));
    } else {
      this.selectedGenres.splice(index, 1);
    }
  }

  isPlatformSelected(platform: string): boolean {
    return this.selectedPlatforms.includes(platform);
  }

  isGenreSelected(genre: string): boolean {
    return this.selectedGenres.includes(genre);
  }

  pageChange(event: number) {
    this.currentPage.set(event);
    if (event <= 500 && event > 0) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      this.fetchGames(this.currentPage());
      this.router.navigate(['/games'], {
        queryParams: { page: this.currentPage() },
        queryParamsHandling: 'merge', // Keeps existing query params
      });
    }
  }
}
