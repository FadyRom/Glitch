import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { RawgApiService } from '../rawg-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ErrorComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  private rawgApiService = inject(RawgApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  searchLink$ = this.rawgApiService.searchGameName('');
  searchResults = computed(() => this.rawgApiService.searchResults());
  loading = computed(() => this.rawgApiService.loadingPage());

  ngOnInit(): void {
    const routeSub = this.route.paramMap.subscribe({
      next: (params: any) => {
        this.rawgApiService
          .searchGameName(params.get('searchTerm'))
          .subscribe();
      },
    });
    this.destroyRef.onDestroy(() => {
      routeSub.unsubscribe();
    });
  }

  selectedSearchGame(gameSelected: number) {
    this.router.navigate(['/games/', gameSelected]);
  }
}
