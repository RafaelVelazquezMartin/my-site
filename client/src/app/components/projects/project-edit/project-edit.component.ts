import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { ProjectsService } from "../../../services/projects/projects.service";
import { Project } from "../../../shared/Project";
import { TechnologiesService } from "../../../services/technologies/technologies.service";
import { Observable } from "rxjs";
import { Technology } from "../../../shared/Technology";
import { take, startWith, map } from "rxjs/operators";
import { ImagesService } from "../../../services/images/images.service";
import { Image } from "../../../shared/Image";
import { MatDialog } from "@angular/material";
import { TechDialogComponent } from "../../tech-dialog/tech-dialog.component";
import { AlertDialogComponent } from "../../alert-dialog/alert-dialog.component";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export interface DialogData {
  name: string;
  type: string;
  logo: File;
}

@Component({
  selector: "app-project-edit",
  templateUrl: "./project-edit.component.html",
  styleUrls: ["./project-edit.component.css"]
})
export class ProjectEditComponent implements OnInit {
  slug: string;
  description: string = '';
  fileUrls = new Array<string>();
  editMode: boolean = false;
  project: Project;
  isDataAvailable: boolean = false;
  projectForm: FormGroup;
  filesToUpload = new Array<File>();
  technologies: Technology[];
  filteredOptions: Observable<Technology[]>[] = [];

  editor = ClassicEditor;

  name: string;
  type: string;
  logo: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imgService: ImagesService,
    private projectService: ProjectsService,
    private techService: TechnologiesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.filesToUpload = [];
    this.fileUrls = [];
    this.techService
      .getTechnologies()
      .subscribe((technologies: Technology[]) => {
        if (technologies) {
          this.technologies = technologies;
          let controls = this.getStack();
          for (let i = 0; i < controls.length; i++) {
            this.manageNameControl(i);
          }
        } else {
          this.technologies = [];
        }
      });

    this.route.data.subscribe(
      (data: { project: Project }) => {
        console.log(data);

        if (data.project) {
          this.project = data.project;
          this.description = this.project.description;
          console.log(this.project);
          this.slug = data.project.slug;
        }
        this.editMode = typeof data.project != "undefined";
        this.initForm(this.project);
      },
      error => {
        console.log(error);
      }
    );
  }

  private initForm(project) {
    let projectName = "";
    // let projectDescription = "";
    let projectImportance = 3;
    let projectStack = new FormArray([]);

    if (this.editMode) {
      projectName = project.name;
      projectImportance = project.importance;
      // projectDescription = project.description;
      if (project.stack) {
        for (let tech of project.stack) {
          console.log(tech.name);
          projectStack.push(new FormControl(tech, Validators.required));
        }
      }
    }

    this.projectForm = new FormGroup({
      name: new FormControl(projectName, Validators.required),
      // description: new FormControl(projectDescription, Validators.required),
      importance: new FormControl(projectImportance, [
        Validators.required,
        Validators.min(0),
        Validators.max(4)
      ]),
      stack: projectStack
    });
  }

  onCreateNewTech(): void {
    const dialogRef = this.dialog.open(TechDialogComponent, {
      width: "500px",
      data: { name: this.name, type: this.type, logo: this.logo }
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      console.log("The dialog was closed");
      console.log(result);
      if (result && result.logo) {
        const formData = new FormData();
        formData.append("image[]", result.logo, result.logo.name);
        this.imgService
          .uploadImages(formData)
          .pipe(take(1))
          .subscribe((image: Image[]) => {
            let newTech = new Technology(
              result.name,
              result.type,
              image[0].imagePath
            );
            this.techService.createTechnology(newTech).subscribe(response => {
              console.log(response);
            });
          });
      }
    });
  }

  onProjectSaved() {
    const newProject = new Project(
      this.projectForm.value.name,
      // this.projectForm.value.description,
      this.description,
      this.project ? this.project.images : [],
      this.projectForm.value.stack,
      this.projectForm.value.importance
    );

    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < files.length; i++) {
      formData.append("image[]", files[i], files[i]["name"]);
    }

    this.imgService
      .uploadImages(formData)
      .pipe(take(1))
      .subscribe((images: Image[]) => {
        for (let image of images) {
          newProject.images.push(image);
        }
        if (this.editMode) {
          this.projectService
            .updateProject(this.project._id, newProject)
            .subscribe(
              response => {
                console.log(response);
                this.slug = newProject.slug;
                this.router.navigate(["../../", newProject.slug], {
                  relativeTo: this.route
                });
              },
              error => {
                console.log(error);
              },
              () => {}
            );
        } else {
          this.projectService.addProject(newProject).subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            },
            () => {
              this.router.navigate(["../", newProject.slug], {
                relativeTo: this.route
              });
            }
          );
        }
      });
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onAddTechnologyFormControl() {
    let controls = <FormArray>this.projectForm.get("stack");
    controls.push(new FormControl("", Validators.required));
    this.manageNameControl(controls.length - 1);
  }

  onDeleteTechnologyFormControl(techIndex: number) {
    (<FormArray>this.projectForm.get("stack")).removeAt(techIndex);
    this.filteredOptions.splice(techIndex, 1);
  }

  getStack(): FormArray {
    return <FormArray>this.projectForm.get("stack");
  }

  onAddImageFormGroup() {
    const group = new FormGroup({
      title: new FormControl("", Validators.required),
      caption: new FormControl("", Validators.required)
    });

    (<FormArray>this.projectForm.get("images")).push(group);
  }

  onDeleteImage(imageIndex: number, imageId: string) {
    let dialogRef = this.dialog.open(AlertDialogComponent, {
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      console.log("The dialog was closed");
      if (confirmed) {
        this.imgService.deleteImage(imageId).subscribe(response => {
          this.project.images.splice(imageIndex, 1);
        });
      }
    });
  }

  getImages(): FormArray {
    return <FormArray>this.projectForm.get("images");
  }

  fileChangeEvent(fileInput) {
    let files = fileInput.target.files;
    if (files) {
      for (let file of files) {
        this.filesToUpload.push(file);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.fileUrls.push(event.target.result);
          this.isDataAvailable = true;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  manageNameControl(index: number) {
    var arrayControl = this.getStack();
    this.filteredOptions[index] = arrayControl.at(index).valueChanges.pipe(
      startWith<string | Technology>(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.technologies.slice()))
    );
  }

  displayFn(tech?: Technology): string | undefined {
    return tech ? tech.name : undefined;
  }

  private _filter(name: string): Technology[] {
    const filterValue = name.toLowerCase();

    return this.technologies.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
