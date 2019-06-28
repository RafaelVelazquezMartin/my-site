import { Component, OnInit, OnDestroy, OnChanges } from "@angular/core";
import { TechnologiesService } from "../../services/technologies/technologies.service";
import { Observable, Subscription } from "rxjs";
import { Technology } from "../../shared/Technology";
import { homeTransition } from "../../animations/home-transition.animation";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  animations: [homeTransition],
  host: {
    "[@homeTransition]": ""
  }
})
export class HomeComponent implements OnInit, OnDestroy, OnChanges {
  technologies: Technology[];
  subscription: Subscription;
  timer;

  htmlToAdd: String = "";

  i: number = 0;
  prevTurn: number;
  turn: number;
  speed: number = 270;

  constructor(private techService: TechnologiesService) {}

  ngOnInit() {
    this.subscription = this.techService.getTechnologies().subscribe(techs => {
      // for (let tech of techs) {
      //   this.technologies.push(tech.name);
      // }
      this.technologies = techs;
      this.turn = Math.floor(Math.random() * this.technologies.length);
      this.prevTurn = this.turn;
      this.timer = setTimeout(() => {
        this.typeWriter();
      }, this.speed + 1000);
      console.log(this.technologies);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearTimeout(this.timer);
  }

  ngOnChanges() {
    console.log("CHANGES");
  }

  typeWriter() {
    if (this.i < this.technologies[this.turn].name.length) {
      this.htmlToAdd = this.technologies[this.turn].name.substring(
        0,
        this.i + 1
      );
      this.i++;
      this.timer = setTimeout(() => {
        this.typeWriter();
      }, this.speed);
    } else {
      this.timer = setTimeout(() => {
        this.resetWriter();
      }, this.speed + 800);
    }
  }

  resetWriter() {
    if (this.i >= 0) {
      this.htmlToAdd = this.htmlToAdd.substring(0, this.i);
      this.i--;
      this.timer = setTimeout(() => {
        this.resetWriter();
      }, this.speed - 200);
    } else {
      this.turn = Math.floor(Math.random() * this.technologies.length);
      while (this.prevTurn === this.turn) {
        this.turn = Math.floor(Math.random() * this.technologies.length);
      }
      this.prevTurn = this.turn;
      this.timer = setTimeout(() => {
        this.typeWriter();
      }, this.speed + 150);
    }
  }

  delayImage() {
    setTimeout(() => {}, this.speed + 2000);
  }
}
