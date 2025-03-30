import { Component, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  currentPage = input<number>(1);
  totalPages = signal<number>(1000);
  private router = inject(Router);

  get visiblePages(): number[] {
    const maxVisiblePages = 9;
    const pages: number[] = [];

    if (this.totalPages() <= maxVisiblePages) {
      return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    let start: number;
    let end: number;

    if (this.currentPage() <= 5) {
      // Show first 7 pages
      start = 2;
      end = 7;
    } else if (this.currentPage() >= this.totalPages() - 4) {
      // Show last 7 pages
      start = this.totalPages() - 6;
      end = this.totalPages() - 1;
    } else {
      // Show pages around current page
      start = this.currentPage() - 2;
      end = this.currentPage() + 2;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  get showEllipsis(): boolean {
    return this.currentPage() < this.totalPages() - 9;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.router.navigate(['/games'], {
        queryParams: { page: page },
        queryParamsHandling: 'merge', // Keeps existing query params
      });
    }
  }
}
