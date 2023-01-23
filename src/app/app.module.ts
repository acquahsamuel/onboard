import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CookieService } from "ngx-cookie-service";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { SharedModule } from "./shared/shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { InterceptorService } from "./services/interceptor.service";
import { AuthenticationDialogComponent } from "./Dialogs/authentication-dialog/authentication-dialog.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ReviewDialog } from "./Dialogs/review-dialog/review-dialog.component";
import { RequestDetailsComponent } from "./pages/request-details/request-details.component";
import { RejectDialogComponent } from "./Dialogs/reject-dialog/reject-dialog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthenticationDialogComponent,
    DashboardComponent,
    ReviewDialog,
    RequestDetailsComponent,
    RejectDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
