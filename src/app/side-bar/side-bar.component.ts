import { Component, signal } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [NavComponent, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  sideState = signal(false);
  showSide(event: boolean) {
    this.sideState.set(event);
  }
  showSide2() {
    this.sideState.set(!this.sideState());
  }
}
