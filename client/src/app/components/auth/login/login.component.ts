import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { homeTransition } from "../../../animations/home-transition.animation";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  animations: [homeTransition],
  host: {
    "[@homeTransition]": ""
  }
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    });
  }

  onLogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // this.authService.signInUser(email, password);
    this.authService.signInUser(email, password).subscribe(
      userData => {
        console.log(userData);
        if (userData.token) {
          this.authService.storeUserData(userData.token);
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.router.navigate(["/"]);
      }
    );
  }
}
