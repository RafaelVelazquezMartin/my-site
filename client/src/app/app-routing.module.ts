import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ProjectComponent } from "./components/projects/project/project.component";
import { AboutComponent } from "./components/about/about.component";
import { NgModule } from "@angular/core";
import { CvComponent } from "./components/cv/cv.component";
import { TestComponent } from "./components/test/test.component";
import { ImgSliderComponent } from "./components/img-slider/img-slider.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
    data: { state: "home" }
  },
  { path: "cv", component: CvComponent, data: { state: "cv" } },
  { path: "about", component: AboutComponent, data: { state: "about" } },
  // { path: "test", component: TestComponent },   not sure what this was. page displays "Greetings from CKEditor"
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
