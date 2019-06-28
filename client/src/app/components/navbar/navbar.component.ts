import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
// import { menuTransition } from "../../animations/menu-transition.animation";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
  // animations: [menuTransition]
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  // onFetch() {
  //   this.projStoreService.fetchProjects().subscribe(projectsData => {
  //     this.projectsService.setProjects(projectsData["projects"]);
  //   });
  // }

  onToggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onLogout() {
    this.authService.logoutUser();
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  //-----------------DEPRECATED-------------------------------------
  // onStore() {
  //   this.projStoreService.storeProjects().subscribe(response => {
  //     console.log(response);
  //   });
  // }
}
