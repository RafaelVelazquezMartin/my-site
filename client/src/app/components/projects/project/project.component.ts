import { Component, OnInit } from "@angular/core";
import { Project } from "../../../shared/Project";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProjectsService } from "../../../services/projects/projects.service";
import { AuthService } from "../../../services/auth/auth.service";
import { Technology } from "../../../shared/Technology";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material";
import { AlertDialogComponent } from "../../alert-dialog/alert-dialog.component";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"]
})
export class ProjectComponent implements OnInit {
  project: Project;
  // project$: Observable<Project>;
  frontendStack: Technology[] = [];
  backendStack: Technology[] = [];
  othersStack: Technology[] = [];
  showSpinner: boolean = true;
  imgPaths: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.project$ = this.route.data["project"];

    this.route.data.subscribe(
      (data: { project: Project }) => {
        console.log(data);
        this.showSpinner = false;
        if (data.project) {
          this.project = data.project;
          if (this.project.images.length > 0) {
            this.imgPaths = this.project.images.map(images => images.imagePath);
          }
          for (let tech of data.project.stack) {
            if (tech.type === "frontend") this.frontendStack.push(tech);
            if (tech.type === "backend") this.backendStack.push(tech);
            if (tech.type === "others") this.othersStack.push(tech);
          }
          console.log(this.project);
        } else {
          this.project = null;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onEdit() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDelete() {
    // console.log(this.projectService.getProjectBySlug(this.project.slug)._id);

    // this.projectService.getProjectBySlug(this.project.slug).subscribe((foundPorject: Project) => {

    // })
    let dialogRef = this.dialog.open(AlertDialogComponent, {
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.projectService.deleteProject(this.project._id).subscribe(
          response => {
            console.log(response);
            this.projectService.getProjects();
          },
          error => {
            console.log(error);
          },
          () => {
            // this.projectService.deleteProject(
            //   this.projectService.getProjectId(this.project.slug)
            // );
            this.router.navigate(["../"], { relativeTo: this.route });
          }
        );
      }
    });
  }

  isSuper() {
    return this.authService.isSuperuser();
  }

  isOwner(author_id: string) {
    return this.authService.isOwner(author_id);
  }
}
