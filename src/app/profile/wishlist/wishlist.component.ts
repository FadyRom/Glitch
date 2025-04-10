import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {}
