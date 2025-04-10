import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {
  games = signal([
    {
      added: 21937,
      added_by_status: {
        yet: 549,
        owned: 12679,
        beaten: 6194,
        toplay: 622,
        dropped: 1145,
      },
      background_image:
        'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
    },
    {
      added: 21937,
      added_by_status: {
        yet: 549,
        owned: 12679,
        beaten: 6194,
        toplay: 622,
        dropped: 1145,
      },
      background_image:
        'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
    },
    {
      added: 21937,
      added_by_status: {
        yet: 549,
        owned: 12679,
        beaten: 6194,
        toplay: 622,
        dropped: 1145,
      },
      background_image:
        'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
    },
    {
      added: 21937,
      added_by_status: {
        yet: 549,
        owned: 12679,
        beaten: 6194,
        toplay: 622,
        dropped: 1145,
      },
      background_image:
        'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
    },
  ]);
}
