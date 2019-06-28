import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "../../components/auth/login/login.component";
import { SignupComponent } from "../../components/auth/signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { AuthComponent } from "../../components/auth/auth.component";
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule
} from "@angular/material";

@NgModule({
  declarations: [AuthComponent, LoginComponent, SignupComponent],
  imports: [
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class AuthModule {}
