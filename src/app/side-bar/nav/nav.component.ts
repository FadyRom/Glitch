import { Component, inject, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  private router = inject(Router);

  showSide = output<boolean>();

  sideState() {
    this.showSide.emit(true);
  }

  searchGame(searchTerm: string) {
    this.router.navigate(['search/', searchTerm]);
  }
}
