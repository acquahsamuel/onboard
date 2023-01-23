import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AlertComponent } from "./alert/alert.component";
import { RequestSidebarComponent } from "./request-sidebar/request-sidebar.component";

//Angular material
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSliderModule } from "@angular/material/slider";
import {
  MAT_RADIO_DEFAULT_OPTIONS,
  MatRadioModule,
} from "@angular/material/radio";
import { MatStepperModule } from "@angular/material/stepper";

import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxMaskModule } from "ngx-mask";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    AlertComponent,
    RequestSidebarComponent,
  ],
  providers: [
    MatIconRegistry,
    DatePipe,
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: "accent" },
    },
  ],
  imports: [
    NgxMaskModule.forRoot(),
    HttpClientModule,
    MatDividerModule,
    MatSidenavModule,
    MatNativeDateModule,

    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatCardModule,
    MatRadioModule,
    MatTabsModule,
    MatStepperModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    MatSliderModule,
    CommonModule,
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    MatDatepickerModule,

    MatExpansionModule,
    MatFormFieldModule,
    NgxMaskModule,
    SidebarComponent,
    MatStepperModule,
    AlertComponent,
    RequestSidebarComponent,
    FlexLayoutModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    MatTooltipModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
  ],
})
export class SharedModule {}
