import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";
import { RequestDetailsComponent } from "./pages/request-details/request-details.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },

  {
    path: "application/request-details/:id",
    component: RequestDetailsComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [{ path: "apps", component: DashboardComponent }],
  },
  {
    path: "onboarding",
    component: DashboardComponent,
  },
  {
    path: "ghana-card",
    loadChildren: () =>
      import("./pages/ghana-card/ghana-card.module").then(
        (m) => m.GhanaCardModule
      ),
  },
  {
    path: "apps",
    loadChildren: () =>
      import("./pages/apps/apps.module").then((m) => m.AppsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
