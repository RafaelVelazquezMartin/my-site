import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  OnDestroy
} from "@angular/core";

@Component({
  selector: "app-img-slider",
  templateUrl: "./img-slider.component.html",
  styleUrls: ["./img-slider.component.css"]
})
export class ImgSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  imgPaths: string[];

  @ViewChild("slider")
  slider: ElementRef;

  @ViewChild("slides")
  slides: ElementRef;

  interval;

  @Input()
  width: string;
  @Input()
  height: number;
  @Input()
  pause: number;
  currentSlide: number = 0;
  stopped: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    console.log(this.imgPaths);

    this.startSlider();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  ngAfterViewInit() {
    this.updateWidths();
  }

  startSlider() {
    this.stopped = false;
    this.interval = setInterval(() => {
      if (
        this.currentSlide ===
        this.slides.nativeElement.childElementCount - 1
      ) {
        this.currentSlide = 0;
      } else {
        this.currentSlide++;
      }
      console.log(this.currentSlide);
      this.slideImage();
    }, this.pause);
  }

  stopSlider() {
    this.stopped = true;
    clearInterval(this.interval);
  }

  onNextSlide() {
    if (this.currentSlide === this.slides.nativeElement.childElementCount - 1) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
    console.log(this.currentSlide);
    this.slideImage();
  }

  onPreviousSlide() {
    if (this.currentSlide === 0) {
      this.currentSlide = this.slides.nativeElement.childElementCount - 1;
    } else {
      this.currentSlide--;
    }
    console.log(this.currentSlide);
    this.slideImage();
  }

  onGoToSlide(index: number) {
    this.currentSlide = index;
    this.slideImage();
  }

  slideImage() {
    this.renderer.setStyle(
      this.slides.nativeElement,
      "margin-left",
      `-${this.currentSlide * this.slider.nativeElement.clientWidth}px`
    );
  }

  updateWidths() {
    console.log("RESIZE");

    this.renderer.setStyle(
      this.slider.nativeElement,
      "height",
      `${this.height}px`
    );
    this.renderer.setStyle(this.slider.nativeElement, "width", this.width);
    console.log(this.slider.nativeElement);

    this.renderer.setStyle(
      this.slides.nativeElement,
      "height",
      `${this.height}px`
    );

    this.renderer.setStyle(
      this.slides.nativeElement,
      "width",
      `${this.slider.nativeElement.clientWidth * this.imgPaths.length}px`
    );

    for (let i = 1; i < this.slides.nativeElement.childNodes.length; i++) {
      this.renderer.setStyle(
        this.slides.nativeElement.childNodes[i],
        "height",
        `${this.height}px`
      );
      this.renderer.setStyle(
        this.slides.nativeElement.childNodes[i],
        "width",
        `${this.slider.nativeElement.clientWidth}px`
      );
    }
  }
}
