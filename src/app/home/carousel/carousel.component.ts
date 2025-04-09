import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  carouselArray = signal<string[]>([
    'carousel/god of war.jpg',
    'carousel/highOnLife.jpg',
    'carousel/wallpaper1.jpg',
  ]);

  carouselIndex = 0;

  displayedCarousel = signal(this.carouselArray()[0]);
  ngOnInit() {
    const moveInterval = setInterval(() => {
      this.moveCarousel();
    }, 3000);

    this.destroyRef.onDestroy(() => {
      clearInterval(moveInterval);
    });
  }

  moveCarousel() {
    this.carouselIndex++;

    if (this.carouselIndex === this.carouselArray().length) {
      this.carouselIndex = 0;
      this.displayedCarousel.set(this.carouselArray()[this.carouselIndex]);
    } else {
      this.displayedCarousel.set(this.carouselArray()[this.carouselIndex]);
    }
  }
}
