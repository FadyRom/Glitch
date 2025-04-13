import { Component, computed, DestroyRef, inject } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ProfileService } from '../../profile.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  private profileService = inject(ProfileService);
  private destroyRef = inject(DestroyRef);

  wishlistGames = computed(() => this.profileService.wishlistGames());
  ngOnInit(): void {
    const sub1 = this.profileService.getGames('wishlist').subscribe();
    this.destroyRef.onDestroy(() => {
      sub1.unsubscribe();
    });
  }
}
