import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { PandaScoreApiService } from '../../panda-score-api.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [LayoutComponent, AsyncPipe, HeaderComponent],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css',
})
export class MatchComponent {
  private pandaScoreService = inject(PandaScoreApiService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  currentRoute = signal<string>('');
  matchData = computed(() => this.pandaScoreService.matchData());

  matchDataSub$ = this.pandaScoreService.getData('', 'matches');
  ngOnInit() {
    const routeSub = this.route.paramMap.subscribe({
      next: (params: any) => {
        this.matchDataSub$ = this.pandaScoreService.getData(
          params.get('esportType'),
          'matches'
        );
        this.currentRoute.set(params.get('esportType'));
      },
    });
    this.destroyRef.onDestroy(() => {
      routeSub.unsubscribe();
    });
  }
}
