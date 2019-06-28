import { Component, OnInit } from "@angular/core";
// import firebase from "firebase/app";
// import * as firebase from "firebase";
import { routerTransition } from "./animations/router-transition.animation";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {
  title = "app";

  constructor() {}

  ngOnInit() {
    // firebase.initializeApp({
    //   apiKey: "AIzaSyBWZfnPARQbs5BVSiokF4_EVT81NPTRclw",
    //   authDomain: "rafaelvelazquezmartin-site.firebaseapp.com"
    // });
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
