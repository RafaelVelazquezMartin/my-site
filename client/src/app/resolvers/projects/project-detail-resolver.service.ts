import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable, EMPTY } from "rxjs";
import { map, take, switchMap, first, tap } from "rxjs/operators";

import { ProjectsService } from "../../services/projects/projects.service";
import { Project } from "../../shared/Project";

@Injectable()
export class ProjectDetailResolver implements Resolve<Project> {
  constructor(private ps: ProjectsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let slug = route.paramMap.get("slug");

    let project = this.ps.getProjectBySlug(slug);
    // console.log(project);

    if (project != undefined) {
      return this.ps.getProject(project._id).pipe(
        take(1),
        map((foundProject: Project) => foundProject)
      );
    } else {
      console.log("TRYING AGAIN");
      return this.ps.getProjects().pipe(
        take(1),
        switchMap(projects => {
          // console.log(projects);
          project = this.ps.getProjectBySlug(slug);
          if (project) {
            return this.ps.getProject(project._id).pipe(
              take(1),
              map((foundProject: Project) => foundProject)
            );
          } else {
            this.router.navigate(["/projects"]);
            return EMPTY;
          }
        })
      );
    }

    // return this.ps
    //   .getProjects()
    //   .pipe(take(1))
    //   .subscribe(
    //     projects => {
    //       project = this.ps.getProjectBySlug(slug);
    //       if (project) {
    //         return this.ps.getProject(project._id).pipe(
    //           take(1),
    //           map((foundProject: Project) => {
    //             console.log(foundProject);
    //             return foundProject;
    //           })
    //         );
    //       }
    //     },
    //     error => {
    //       console.error(error);
    //       return null;
    //     },
    //     () => {
    //       console.log("AFTER");
    //     }
    //   );

    // let p = this.ps.getProjectBySlug(slug).subscribe((foundProject: Project) => {
    //   this.project = foundProject
    // }, error => {console.log(error);
    //   }, () => {
    //     return this.pss.getProject(this.project._id).pipe(
    //       take(1),
    //       map((project: Project) => {
    //         console.log(project);
    //         if (project) {
    //           return project;
    //         } else {
    //           this.router.navigate(["/projects"]);
    //           return null;
    //         }
    //       })
    //     );
    // })

    // this.ps.getProjectBySlug(slug).

    // return this.ps.getProjectBySlug(slug).pipe(
    //   take(1),
    //   tap((foundProject: Project) => {
    //     this.pss.getProject(foundProject._id).pipe(
    //       take(1),
    //       map((project: Project) => {
    //         console.log(project);
    //         if (project) {
    //           return project;
    //         } else {
    //           this.router.navigate(["/projects"]);
    //           return null;
    //         }
    //       })
    //     );
    //   })
    // );
  }
}
