import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '../../interfaces';

@Component({
  selector: 'app-game-grid',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.css',
})
export class GameGridComponent {
  games = input.required<Game[]>();

  bookmarkGame(gameId: any) {
    console.log(gameId);
  }
}
