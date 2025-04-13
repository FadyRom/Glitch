import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ContentComponent, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private profileService = inject(ProfileService);
  private destroyRef = inject(DestroyRef);
  libraryCount = signal(this.profileService.libraryGames().length);
  wishlistCount = signal(this.profileService.wishlistGames().length);

  ngOnInit(): void {
    const sub1 = this.profileService.getGames('library').subscribe({
      complete: () =>
        this.libraryCount.set(this.profileService.libraryGames().length),
    });
    const sub2 = this.profileService.getGames('wishlist').subscribe({
      complete: () =>
        this.wishlistCount.set(this.profileService.wishlistGames().length),
    });

    this.destroyRef.onDestroy(() => {
      sub1.unsubscribe();
      sub2.unsubscribe();
    });
  }
}
