import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-error-popup',
  standalone: true,
  imports: [],
  templateUrl: './error-popup.component.html',
  styleUrl: './error-popup.component.css',
})
export class ErrorPopupComponent {
  visible = input<boolean>(true);
}
