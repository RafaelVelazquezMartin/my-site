import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { CoreModule } from "./modules/core/core.module";
import { ProjectsModule } from "./modules/projects/projects.module";
import { AuthModule } from "./modules/auth/auth.module";
import { HttpClientModule } from "@angular/common/http";
import { ProjectEditComponent } from "./components/projects/project-edit/project-edit.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { JwtModule } from "@auth0/angular-jwt";
import { TestComponent } from "./components/test/test.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatOptionModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule,
  MatSelectModule,
  MatTabsModule
} from "@angular/material";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

import { TechDialogComponent } from "./components/tech-dialog/tech-dialog.component";
import { AlertDialogComponent } from "./components/alert-dialog/alert-dialog.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
library.add(fab);

export function tokenGetter() {
  return localStorage.getItem("auth_token");
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectEditComponent,
    TestComponent,
    TechDialogComponent,
    AlertDialogComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          "localhost:3000",
          "35.222.61.88"
        ]
      }
    }),
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    AuthModule,
    ProjectsModule,
    CoreModule,
    CKEditorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
