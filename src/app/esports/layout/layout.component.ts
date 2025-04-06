import { DatePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatchResponse } from '../../panda-score-interface';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  matchResponse = input.required<MatchResponse[]>();
  noData = signal(false);
  currentRoute = input.required<string>();

  ngOnInit() {
    if (this.matchResponse().length === 0) {
      this.noData.set(true);
    }
  }
}
