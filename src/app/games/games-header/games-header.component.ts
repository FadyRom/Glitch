import { NgStyle } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { GamingService } from '../gaming.service';
import { GameResponse } from '../../interfaces';

@Component({
  selector: 'app-games-header',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './games-header.component.html',
  styleUrl: './games-header.component.css',
})
export class GamesHeaderComponent {
  gameNameInput = input.required<string>();
  gameBackgroundInput = input.required<string>();
  game = input.required<GameResponse>();

  private gamingService = inject(GamingService);

  copyLinkStatus = signal<boolean>(false);

  addWishlist() {
    this.gamingService.addGameToWishlist(this.game());
  }
  addLibrary() {
    this.gamingService.addGameToLibrary(this.game());
  }

  copyLink() {
    this.copyLinkStatus.set(true);
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      setTimeout(() => {
        this.copyLinkStatus.set(false);
      }, 1500);
    });
  }
}
