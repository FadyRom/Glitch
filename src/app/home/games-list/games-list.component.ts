import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '../../interfaces';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css',
})
export class GamesListComponent implements OnInit {
  listHeader = input.required<string>();
  buttonRoute = input.required<string>();
  querParams = input<string>('');
  gamesList = input.required<Game[]>();

  ngOnInit(): void {}

  gameData(game: Game) {
    console.log(game);
  }
}
