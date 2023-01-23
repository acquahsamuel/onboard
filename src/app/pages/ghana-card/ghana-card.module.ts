import { NgModule } from "@angular/core";

import { GhanaCardRoutingModule } from "./ghana-card-routing.module";
import { GhanaCardComponent } from "./ghana-card.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DetailsComponent } from "./details/details.component";
import { ReviewDialog } from "./review-dialog/review-dialog.component";
import { ExcelDownloadDialogComponent } from "./excel-download-dialog/excel-download-dialog.component";

@NgModule({
  declarations: [
    GhanaCardComponent,
    DashboardComponent,
    DetailsComponent,
    ExcelDownloadDialogComponent,
    ReviewDialog,
  ],
  imports: [GhanaCardRoutingModule, SharedModule],
})
export class GhanaCardModule {}
