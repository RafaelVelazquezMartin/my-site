import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProjectsService } from "../../services/projects/projects.service";
import { Project } from "../../shared/Project";
import { Subscription, Subject, Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { MatDialog } from "@angular/material";
import { AlertDialogComponent } from "../alert-dialog/alert-dialog.component";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent implements OnInit, OnDestroy {
  // projects: Observable<Project[]>;
  projects: Project[] = [];
  projects$: Observable<Project[]>;
  // private unsubscribe: Subject<any> = new Subject();
  // interval: any;
  private projectsChangedSubscription: Subscription;
  showSpinner: boolean = true;

  constructor(
    private authService: AuthService,
    private projectsService: ProjectsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getProjects();

    // this.route.data.subscribe(
    //   (data: { projectsData: Project[] }) => {
    //     this.showSpinner = false;
    //     if (data.projectsData) {
    //       this.projects = data.projectsData;
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );

    // this.refreshProjects();
    // if (this.interval) {
    //   clearInterval(this.interval);
    // }
    // this.interval = setInterval(() => {
    //   this.refreshProjects();
    // }, 5 * 1000);

    // this.projectsService.projects$
    //   .pipe(takeUntil(this.unsubscribe))
    //   .subscribe(projects => {
    //     this.projects = projects;
    //   });

    // this.projects = this.projectsService.getProjects();  GOOD PATTERN
  }

  ngOnDestroy() {
    this.projectsChangedSubscription.unsubscribe();
    // this.unsubscribe.next();
    // this.unsubscribe.complete();
  }

  getProjects() {
    this.projectsChangedSubscription = this.projectsService
      .getProjects()
      .subscribe(
        (projects: Project[]) => {
          this.showSpinner = false;
          this.projects = projects;
          console.log(this.projects);
        },
        error => {
          this.showSpinner = false;
        }
      );

    // simulate long request for spinner to show
    // setTimeout(() => {
    //   this.projects$ = this.projectsService
    //     .getProjects()
    //     .pipe(tap(response => (this.showSpinner = false)));
    // }, 5000);
  }

  // refreshProjects() {
  //   this.projectsService
  //     .updateProjects()
  //     .pipe(takeUntil(this.unsubscribe))
  //     .subscribe();
  // }

  onNewProject() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  onDeleteProject(index: number, projectId: string) {
    if (
      this.authService.isSuperuser() ||
      this.authService.isOwner(this.projects[index].author)
    ) {
      let dialogRef = this.dialog.open(AlertDialogComponent, {
        width: "400px"
      });

      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.projectsService.deleteProject(projectId).subscribe(
            response => {
              // this.projectsService.deleteProject(index);
              this.getProjects();
              console.log(response);
            },
            error => {
              console.log(error);
            }
          );
        }
      });
    }
  }

  isSuper() {
    return this.authService.isSuperuser();
  }

  isOwner(author_id: string) {
    return this.authService.isOwner(author_id);
  }
}
