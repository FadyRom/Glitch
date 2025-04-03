import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { RawgApiService } from '../../rawg-api.service';
import { HeaderComponent } from '../../header/header.component';
import { GamesHeaderComponent } from '../games-header/games-header.component';

@Component({
  selector: 'app-selected-game',
  standalone: true,
  imports: [GamesHeaderComponent],
  templateUrl: './selected-game.component.html',
  styleUrl: './selected-game.component.css',
})
export class SelectedGameComponent implements OnInit {
  private rawgApiService = inject(RawgApiService);
  private destroyRef = inject(DestroyRef);

  selectedGameId = input.required<string>();
  game = computed(() => this.rawgApiService.selectedGameById());

  ngOnInit(): void {
    this.rawgApiService.getGameById(this.selectedGameId()).subscribe({
      next: (res) => console.log(res),
    });
  }
}
