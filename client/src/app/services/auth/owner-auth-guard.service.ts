import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from "./auth.service";
import { ProjectsService } from "../projects/projects.service";

@Injectable()
export class OwnerAuthGuard implements CanActivate {
  id: String;

  constructor(
    private authService: AuthService,
    private projectsService: ProjectsService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      const project = this.projectsService.getProjectBySlug(route.params.slug);
      // const owner_id = route.data["author"];
      console.log(project.author);

      return (
        this.authService.isOwner(project.author) ||
        this.authService.isSuperuser()
      );
    } else {
      console.log("Unauthorized");

      this.router.navigate(["/auth"]);
      return this.authService.isAuthenticated();
    }
  }
}
