import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import {
  ProjectsService,
  IProjectsRes
} from "../../services/projects/projects.service";
import { Project } from "../../shared/Project";

@Injectable()
export class ProjectsResolver implements Resolve<Project[]> {
  constructor(private ps: ProjectsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Project[]> {
    // return this.pss.fetchProjects();
    return this.ps.getProjects().pipe(
      tap((projects: Project[]) => {
        if (projects) {
          // this.ps.setProjects(projects.projects);
          return projects;
        } else {
          this.router.navigate(["/"]);
          return null;
        }
      })
    );
  }
}
