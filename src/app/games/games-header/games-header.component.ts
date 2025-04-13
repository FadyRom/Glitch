import { NgStyle } from '@angular/common';
import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { GamingService } from '../gaming.service';
import { Game, GameResponse } from '../../interfaces';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-games-header',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './games-header.component.html',
  styleUrl: './games-header.component.css',
})
export class GamesHeaderComponent {
  private profileService = inject(ProfileService);
  private destroyRef = inject(DestroyRef);

  gameNameInput = input.required<string>();
  gameBackgroundInput = input.required<string>();
  game = input.required<GameResponse>();
  gameInLibrary = input.required<boolean>();
  gameInWishlist = input.required<boolean>();

  copyLinkStatus = signal<boolean>(false);

  addWishlist() {
    this.profileService.addToProfile(this.game(), 'wishlist').subscribe();
  }
  addLibrary() {
    this.profileService.addToProfile(this.game(), 'library').subscribe();
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
