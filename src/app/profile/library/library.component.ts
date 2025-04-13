import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent implements OnInit {
  private profileService = inject(ProfileService);
  private destroyRef = inject(DestroyRef);

  libraryGames = computed(() => this.profileService.libraryGames());
  ngOnInit(): void {
    const sub1 = this.profileService.getGames('library').subscribe();
    this.destroyRef.onDestroy(() => {
      sub1.unsubscribe();
    });
  }
}
