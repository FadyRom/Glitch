import { Component, computed, inject, input } from '@angular/core';
import { RawgApiService } from '../rawg-api.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  private rawgApiService = inject(RawgApiService);
  loading = computed(() => this.rawgApiService.loadingPage());
  pleaseCheck = input.required<string>();
}
