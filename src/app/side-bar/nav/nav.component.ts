import { Component, output } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  showSide = output<boolean>();

  sideState() {
    this.showSide.emit(true);
  }
}
