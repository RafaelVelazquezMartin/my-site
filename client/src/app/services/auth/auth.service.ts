import { Injectable } from "@angular/core";
// import firebase from "firebase/app";
import * as firebase from "firebase";
import "firebase/auth";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
  authToken: string;
  userEmail: string;
  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  signUpUser(email: string, password: string, role?: string) {
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .catch(error => {
    //     console.log(error);
    //   });
    const newUser = {
      email: email,
      password: password,
      role: role ? role : undefined
    };
    return this.http.post("https://cors-anywhere.herokuapp.com/http://35.222.61.88/users/signup", newUser).pipe(
      map(response => {
        response;
      })
    );
  }

  signInUser(email: string, password: string): Observable<any> {
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(response => {
    //     this.router.navigate(["/"]);
    //     console.log("You are logged in as: " + email);
    //     firebase
    //       .auth()
    //       .currentUser.getIdToken()
    //       .then((token: string) => {
    //         this.token = token;
    //       });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    const loginUser = {
      email: email,
      password: password
    };
    return this.http
      .post("https://cors-anywhere.herokuapp.com/http://35.222.61.88/users/login", loginUser)
      .pipe(map(response => response));
  }

  logoutUser() {
    // firebase.auth().signOut();
    this.router.navigate(["/"]);
    this.authToken = null;
    this.userEmail = null;
    localStorage.clear();
  }

  getToken() {
    // firebase
    //   .auth()
    //   .currentUser.getIdToken()
    //   .then((token: string) => {
    //     this.token = token;
    //   });
    const token = this.jwtHelper.tokenGetter();
    this.authToken = token;
    return this.authToken;
  }

  storeUserData(token: string) {
    const tokenInfo = this.jwtHelper.decodeToken(token);
    localStorage.setItem("auth_token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        role: tokenInfo.role,
        email: tokenInfo.email,
        _id: tokenInfo.user_id
      })
    );

    // localStorage.setItem("user_email", email);
    this.authToken = token;
    // this.userEmail = email;
  }

  loadToken() {
    // const token = localStorage.getItem("auth_token");
    // this.authToken = token;
    this.authToken = this.jwtHelper.tokenGetter();
  }

  getLoggedInUser() {
    if (this.isAuthenticated()) {
      return JSON.parse(localStorage.getItem("user"))._id;
    }
    return null;
  }

  isAuthenticated() {
    if (typeof this.jwtHelper.tokenGetter() === "undefined") {
      return false; // was true, but makes no sense
    } else {
      return !this.jwtHelper.isTokenExpired(this.jwtHelper.tokenGetter());
    }
  }

  isSuperuser() {
    if (localStorage.getItem("user") == undefined) {
      return false; // was true, but makes no sense
    } else {
      return (
        JSON.parse(localStorage.getItem("user")).role === "superuser" &&
        !this.jwtHelper.isTokenExpired(this.jwtHelper.tokenGetter())
      );
    }
  }

  isOwner(owner_id: string) {
    if (localStorage.getItem("user") == undefined || owner_id == undefined) {
      return false; // was true, but makes no sense
    } else {
      return (
        owner_id === JSON.parse(localStorage.getItem("user"))._id &&
        !this.jwtHelper.isTokenExpired(this.jwtHelper.tokenGetter())
      );
    }
  }
}
