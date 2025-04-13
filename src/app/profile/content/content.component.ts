import { Component, computed, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent {
  private profileService = inject(ProfileService);
  private destroyRef = inject(DestroyRef);

  wishlistGames = computed(() =>
    this.profileService.wishlistGames().slice(0, 3)
  );
  libraryGames = computed(() => this.profileService.libraryGames().slice(0, 3));

  ngOnInit() {
    const sub1 = this.profileService.getGames('library').subscribe();
    const sub2 = this.profileService.getGames('wishlist').subscribe();
    this.destroyRef.onDestroy(() => {
      sub1.unsubscribe();
      sub2.unsubscribe();
    });
  }
}
