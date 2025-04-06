import { Component, inject } from '@angular/core';
import { PandaScoreApiService } from '../panda-score-api.service';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-esports',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './esports.component.html',
  styleUrl: './esports.component.css',
})
export class EsportsComponent {}
