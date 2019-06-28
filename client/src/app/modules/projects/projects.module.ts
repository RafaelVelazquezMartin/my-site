import { NgModule } from "@angular/core";
import { ProjectsComponent } from "../../components/projects/projects.component";
import { ProjectComponent } from "../../components/projects/project/project.component";
import { SharedModule } from "../../shared/shared.module";
import { ProjectsRoutingModule } from "./projects-routing.module";
import { LoadingComponent } from "../../components/loading/loading.component";
import { TechDialogComponent } from "../../components/tech-dialog/tech-dialog.component";
import { AlertDialogComponent } from "../../components/alert-dialog/alert-dialog.component";
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule,
  MatTabsModule
} from "@angular/material";
import { ImgSliderComponent } from "../../components/img-slider/img-slider.component";

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    LoadingComponent,
    ImgSliderComponent
  ],
  imports: [
    ProjectsRoutingModule,
    SharedModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule
  ],
  entryComponents: [TechDialogComponent, AlertDialogComponent]
})
export class ProjectsModule {}
