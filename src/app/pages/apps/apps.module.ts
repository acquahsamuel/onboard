import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppsRoutingModule } from "./apps-routing.module";
import { AppsComponent } from "./apps.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [AppsComponent],
  imports: [CommonModule, AppsRoutingModule, SharedModule],
})
export class AppsModule {}
