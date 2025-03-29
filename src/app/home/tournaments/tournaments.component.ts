import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css',
})
export class TournamentsComponent {}
