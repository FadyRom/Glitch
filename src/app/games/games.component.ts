import {
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AbiosApiService } from '../rawg-api.service';
import { Game } from '../interfaces';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../paginator/paginator.component';
import { LoadingComponent } from '../loading/loading.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GamingService } from './gaming.service';

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
  private gamingService = inject(GamingService);

  gamesGrid = viewChild<ElementRef<HTMLDivElement>>('gamesGrid');

  games = signal<Game[]>([]);
  isLoading = signal(true);

  platforms = this.gamingService.platforms;
  genres = this.gamingService.genres;
  currentPage = signal<number>(1);
  totalPages = signal<number>(400);
  selectedPlatforms = signal<string[]>([]);
  selectedGenres = signal<string[]>([]);

  ngOnInit(): void {
    const routeSub = this.route.queryParams.subscribe({
      next: (params: any) => {
        console.log(params);
        if (params.platform) {
          this.checkPlatformParams(params.platform);
        }
        if (params.page || params.platforms || params.genre) {
          this.gamesGrid()!.nativeElement.scrollIntoView({
            behavior: 'smooth',
          });
        }
        this.currentPage.set(params['page'] ? Number(params['page']) : 1);
        if (this.currentPage() > this.totalPages()) {
          this.currentPage.set(this.totalPages());
          this.router.navigate(['/games'], {
            queryParams: { page: this.currentPage() },
            queryParamsHandling: 'merge', // Keeps existing query params
          });
        } else {
          this.fetchGames(this.currentPage(), params.platform, params.genre);
        }
      },
    });

    this.destroyRef.onDestroy(() => {
      routeSub.unsubscribe();
    });
  }

  checkPlatformParams(params: string) {
    if (params) {
      let platforms = params.split(',');
      if (platforms.includes('1')) {
        this.selectedPlatforms().push('PC');
      }
      if (platforms.includes('3')) {
        this.selectedPlatforms().push('XBOX');
      }
      if (platforms.includes('2')) {
        this.selectedPlatforms().push('Playstation');
      }
    }
  }

  private fetchGames(page: number = 1, platform?: string, genres?: string) {
    const sub = this.rawgApiService
      .getAllGames(page, platform, genres)
      .subscribe({
        next: (res) => {
          this.isLoading.set(true);
          this.games.set(res.results);
        },
        complete: () => {
          setTimeout(() => {
            this.isLoading.set(false);
          }, 500);
        },
      });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  togglePlatform(platform: string) {
    const index = this.selectedPlatforms().indexOf(platform);
    if (index === -1) {
      this.selectedPlatforms().push(platform);
    } else {
      this.selectedPlatforms().splice(index, 1);
    }
  }

  applyPlatformFilters() {
    this.gamingService.applyPlatformFilters(
      this.selectedPlatforms(),
      this.currentPage()
    );
  }

  isPlatformSelected(platform: string): boolean {
    return this.selectedPlatforms().includes(platform);
  }

  toggleGenre(genre: string) {
    const index = this.selectedGenres().indexOf(genre);
    if (index === -1) {
      this.selectedGenres().push(genre);
    } else {
      this.selectedGenres().splice(index, 1);
    }
  }

  applyGenreFilters() {
    this.gamingService.applyGenreFilters(
      this.selectedGenres(),
      this.currentPage()
    );
  }

  isGenreSelected(genre: string): boolean {
    return this.selectedGenres().includes(genre);
  }

  pageChange(event: number) {
    this.currentPage.set(event);
    if (event <= this.totalPages() && event > 0) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      this.router.navigate(['/games'], {
        queryParams: { page: this.currentPage() },
        queryParamsHandling: 'merge', // Keeps existing query params
      });
    }
  }

  selectedGame(gameId: number) {}
}
