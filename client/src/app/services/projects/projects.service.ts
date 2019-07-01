import { Injectable } from "@angular/core";
import { Project } from "../../shared/Project";
import { Observable, BehaviorSubject } from "rxjs";
import {
  tap,
  switchMap,
  find,
  findIndex,
  map,
  catchError
} from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Image } from "../../shared/Image";

export interface IProjectsRes {
  count?: number;
  projects?: Project[];
  message?: string;
}

@Injectable()
export class ProjectsService {
  // private projectsChanged = new BehaviorSubject<Project[]>([]);
  // projects$: Observable<Project[]> = this.projectsChanged.asObservable();

  private projects: Project[] = [];

  constructor(private authService: AuthService, private http: HttpClient) { }

  // getProjects() {
  //   return this.projects.slice();
  //   this.pss.fetchProjects();
  // }

  getProjects(): Observable<Project[]> {
    // return this.http.get<IProjectsRes>("http://localhost:3000/projects/").pipe(
    //   tap((response: IProjectsRes) => {
    //     if (response.projects) {
    //       this.projects = response.projects;
    //       this.projectsChanged.next(response.projects);
    //     } else {
    //       this.projects = [];
    //       this.projectsChanged.next([]);
    //     }
    //   })
    // );

    return this.http.get<IProjectsRes>("https://cors-anywhere.herokuapp.com/http://35.222.61.88/projects/").pipe(
      map((response: IProjectsRes) => response.projects),
      tap(projects => {
        console.log(projects);
        this.projects = projects;
      })
    );
  }

  addProject(newProject: Project) {
    // const token = this.authService.getToken();
    // return this.http.put(
    //   "https://rafaelvelazquezmartin-site.firebaseio.com/projects.json?auth=" +
    //     token,
    //   this.projectService.getProjects()
    // );
    const token = this.authService.getToken();
    return this.http
      .post("https://cors-anywhere.herokuapp.com/http://35.222.61.88/projects/", newProject, {
        headers: new HttpHeaders({ Authorization: token })
      })
      .pipe(
        tap(response => {
          this.projects.push(response["createdProject"]);
        })
      );
  }

  updateProject(projectId: string, newProject: Project) {
    const ops = [];
    for (var propertyName in newProject) {
      ops.push({ propName: propertyName, value: newProject[propertyName] });
    }
    const token = this.authService.getToken();
    return this.http
      .patch("https://cors-anywhere.herokuapp.com/http://35.222.61.88/projects/" + projectId, ops, {
        headers: new HttpHeaders({ Authorization: token })
      })
      .pipe(
        tap(response => {
          const index = this.projects.indexOf(response["oldProject"]);
          this.projects[index] = response["updatedProject"];
          console.log("SERVICE: " + JSON.stringify(this.projects[index]));
        })
      );
  }

  getProject(projectId: string) {
    return this.http
      .get("https://cors-anywhere.herokuapp.com/http://35.222.61.88/projects/" + projectId)
      .pipe(map(response => response));
  }

  deleteProject(projectId: string) {
    const token = this.authService.getToken();
    return this.http
      .delete("https://cors-anywhere.herokuapp.com/http://35.222.61.88/projects/" + projectId, {
        headers: new HttpHeaders({ Authorization: token })
      })
      .pipe(
        tap(response => {
          const index = this.projects.indexOf(response["deletedProject"]);
          this.projects.splice(index, 1);
        })
      );
  }

  // setProjects(projects: Project[]) {
  //   this.projects = projects;
  //   this.projectsChanged.next(this.projects.slice());
  // }

  getProjectBySlug(slug: string) {
    return this.projects.find((project: Project) => {
      return project.slug === slug;
    });
  }

  // getProjectBySlug(slug: string) {
  //   return this.projects.find((project: Project) => {
  //     return project.slug === slug;
  //   });
  // }

  // getProjectId(slug: string) {
  //   const projectIndex = this.projects$.pipe(
  //     findIndex((project: Project) => {
  //       return project.slug === slug;
  //     })
  //   );
  //   return projectIndex;
  // }

  getProjectId(slug: string) {
    const projectIndex = this.projects.findIndex((project: Project) => {
      return project.slug === slug;
    });
    return projectIndex;
  }

  // addProject(newProject: Project) {
  //   this.projects.push(newProject);
  //   this.projectsChanged.next(this.projects.slice());
  // }

  // updateProject(index: number, newProject: Project) {
  //   this.projects[index] = newProject;
  //   this.projectsChanged.next(this.projects.slice());
  // }

  // onProjectChange() {
  //   this.projectsChanged.next(this.projects.slice());
  // }

  // deleteProject(index: number) {
  //   this.projects.splice(index, 1);
  //   this.projectsChanged.next(this.projects.slice());
  // }
}
