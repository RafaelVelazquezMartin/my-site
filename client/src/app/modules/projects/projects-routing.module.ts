import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProjectsComponent } from "../../components/projects/projects.component";
import { ProjectComponent } from "../../components/projects/project/project.component";
import { AuthGuard } from "../../services/auth/auth-guard.service";
import { ProjectEditComponent } from "../../components/projects/project-edit/project-edit.component";
import { ProjectDetailResolver } from "../../resolvers/projects/project-detail-resolver.service";
import { ProjectsResolver } from "../../resolvers/projects/projects-resolver.service";
import { OwnerAuthGuard } from "../../services/auth/owner-auth-guard.service";

const projectsRoutes: Routes = [
  {
    path: "projects",
    component: ProjectsComponent,
    data: { state: "projects" }
    // resolve: { projectsData: ProjectsResolver }
    // children: [{ path: ":slug", component: ProjectComponent }]
  },
  {
    path: "projects/new",
    component: ProjectEditComponent,
    canActivate: [AuthGuard],
    data: { state: "project" }
  },
  {
    path: "projects/:slug",
    component: ProjectComponent,
    resolve: {
      project: ProjectDetailResolver
    },
    data: { state: "project" }
  },
  {
    path: "projects/:slug/edit",
    component: ProjectEditComponent,
    resolve: {
      project: ProjectDetailResolver
    },
    canActivate: [AuthGuard, OwnerAuthGuard],
    data: { state: "project" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(projectsRoutes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    OwnerAuthGuard,
    ProjectDetailResolver,
    ProjectsResolver
  ]
})
export class ProjectsRoutingModule {}
