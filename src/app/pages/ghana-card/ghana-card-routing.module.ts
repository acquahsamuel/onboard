import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DetailsComponent } from "./details/details.component";
import { GhanaCardComponent } from "./ghana-card.component";

const routes: Routes = [
  {
    path: "",
    component: GhanaCardComponent,

    children: [
      {
        path: "details/:SEARCH/:ID",
        component: DetailsComponent,
      },
      {
        path: "",
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GhanaCardRoutingModule {}
