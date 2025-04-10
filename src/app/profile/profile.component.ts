import { Component } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ContentComponent, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
