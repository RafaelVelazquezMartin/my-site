import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from "@angular/router";
import { homeTransition } from "../../../animations/home-transition.animation";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  animations: [homeTransition],
  host: {
    "[@homeTransition]": ""
  }
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.isSuper()) {
      this.registerForm = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", Validators.required),
        role: new FormControl(null)
      });
    } else {
      this.registerForm = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", Validators.required)
      });
    }
  }

  onRegister() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    if (this.registerForm.value.role) {
      const role = this.registerForm.value.role;
      this.authService.signUpUser(email, password, role).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        },
        () => {
          this.authService.signInUser(email, password).subscribe(
            userData => {
              console.log(userData);
              if (userData.token) {
                this.authService.storeUserData(userData.token);
              }

              this.router.navigate(["/"]);
            },
            error => {
              console.log(error);
            }
          );
        }
      );
    } else {
      this.authService.signUpUser(email, password).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        },
        () => {
          this.authService.signInUser(email, password).subscribe(
            userData => {
              console.log(userData);
              if (userData.token) {
                this.authService.storeUserData(userData.token);
              }

              this.router.navigate(["/"]);
            },
            error => {
              console.log(error);
            }
          );
        }
      );
    }
  }

  isSuper() {
    return this.authService.isSuperuser();
  }
}
