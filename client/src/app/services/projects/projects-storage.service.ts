import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Project } from "../../shared/Project";
import { ProjectsService, IProjectsRes } from "./projects.service";
import { AuthService } from "../auth/auth.service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Image } from "../../shared/Image";

@Injectable()
export class ProjectsStorageService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient, private authService: AuthService) { }

  // storeProject(newProject: {
  //   name: string;
  //   description: string;
  //   importance: number;
  //   images?: Image[];
  // }) {
  storeProject(newProject: FormData) {
    // const token = this.authService.getToken();
    // return this.http.put(
    //   "https://rafaelvelazquezmartin-site.firebaseio.com/projects.json?auth=" +
    //     token,
    //   this.projectService.getProjects()
    // );
    const token = this.authService.getToken();
    return this.http.post("https://cors-anywhere.herokuapp.com/http://35.222.61.88/projects/", newProject, {
      headers: new HttpHeaders({ Authorization: token })
    });
  }

  updateProject(
    projectId: string,
    newProject: {
      name: string;
      description: string;
      importance: number;
      images?: Image[];
    }
  ) {
    const ops = [];
    for (var propertyName in newProject) {
      ops.push({ propName: propertyName, value: newProject[propertyName] });
    }
    const token = this.authService.getToken();
    return this.http.patch("https://cors-anywhere.herokuapp.com/http://35.222.61.88/projects/" + projectId, ops, {
      headers: new HttpHeaders({ Authorization: token })
    });
  }

  getProject(projectId: string) {
    return this.http
      .get("https://cors-anywhere.herokuapp.com/http://35.222.61.88/projects/" + projectId)
      .pipe(map(response => response));
  }

  deleteProject(projectId: string) {
    const token = this.authService.getToken();
    return this.http.delete("https://cors-anywhere.herokuapp.com/http://35.222.61.88/projects/" + projectId, {
      headers: new HttpHeaders({ Authorization: token })
    });
  }

  fetchProjects(): Observable<IProjectsRes> {
    // this.http
    //   .get<Project[]>(
    //     "https://rafaelvelazquezmartin-site.firebaseio.com/projects.json"
    //   )
    //   .subscribe((projects: Project[]) => {
    //     for (let project of projects) {
    //       if (!project.images) {
    //         project.images = [];
    //       }
    //     }
    //     this.projectService.setProjects(projects);
    //   });
    return this.http.get<IProjectsRes>("https://cors-anywhere.herokuapp.com/http://35.222.61.88/projects/").pipe(
      map(
        response => response // returns response, not list of projects
        // response => response['projects']  returns list of projects
      )
    );
  }

  //--------------------------- OLD VERSION --------------------------------------
  // fetchProjects() {
  //   const token = this.authService.getToken();
  //   this.http
  //     .get<Project[]>(
  //       "https://rafaelvelazquezmartin-site.firebaseio.com/projects.json?auth=" +
  //       token
  //     )
  //     .subscribe((projects: Project[]) => {
  //       for (let project of projects) {
  //         if (!project.images) {
  //           project.images = [];
  //         }
  //       }
  //       this.projectService.setProjects(projects);
  //     });
  // }
}
