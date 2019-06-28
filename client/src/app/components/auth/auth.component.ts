import { Component, OnInit } from "@angular/core";
import { homeTransition } from "../../animations/home-transition.animation";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
  animations: [homeTransition],
  host: {
    "[@homeTransition]": ""
  }
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
