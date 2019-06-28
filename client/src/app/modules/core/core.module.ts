import { NgModule } from "@angular/core";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AppRoutingModule } from "../../app-routing.module";
import { ProjectsService } from "../../services/projects/projects.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AboutComponent } from "../../components/about/about.component";
import { CvComponent } from "../../components/cv/cv.component";
import { HomeComponent } from "../../components/home/home.component";
import { SharedModule } from "../../shared/shared.module";
import { AuthService } from "../../services/auth/auth.service";
import { TechnologiesService } from "../../services/technologies/technologies.service";
import { ImagesService } from "../../services/images/images.service";

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    CvComponent,
    HomeComponent
  ],
  imports: [AppRoutingModule, FontAwesomeModule, SharedModule],
  providers: [ProjectsService, AuthService, TechnologiesService, ImagesService],
  exports: [AppRoutingModule, NavbarComponent, FooterComponent]
})
export class CoreModule {}
