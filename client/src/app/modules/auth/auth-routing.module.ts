import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../../components/auth/login/login.component";
import { SignupComponent } from "../../components/auth/signup/signup.component";
import { AuthComponent } from "../../components/auth/auth.component";

const authRoutes: Routes = [
  {
    path: "auth",
    component: AuthComponent
    // data: { state: "auth" }
  },
  { path: "auth/login", component: LoginComponent, data: { state: "login" } },
  {
    path: "auth/register",
    component: SignupComponent,
    data: { state: "register" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
