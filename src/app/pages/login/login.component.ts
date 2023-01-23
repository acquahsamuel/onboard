import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginModel } from "src/app/interface/types";
import { AuthService } from "src/app/services/auth.service";
import { ToastService } from "src/app/services/toast.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  authResp: any;
  loader = false;

  assetPreloader;
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    this.assetPreloader = environment.assetPreLoader;
    this.loginFormGroup = this._formBuilder.group(new LoginModel());
  }

  ngOnInit() {}

  async login() {
    if (this.loginFormGroup.status === "VALID") {
      this.loader = true;
      const data = JSON.stringify(this.loginFormGroup.value);

      this.authResp = await this.authService.validateUser(data);
      if (this.authResp.hostHeaderInfo.responseCode === "000") {
        this.loader = false;
        this.toast.showToast("Login Successful", "success-toast");

        this.router.navigate(["/apps"]);
      } else if (this.authResp.hostHeaderInfo.responseCode === "A05") {
        this.loader = false;
        this.toast.showToast("Invalid User Credentials", "error-toast");
      } else {
        this.loader = false;
        this.toast.showToast(
          this.authResp.hostHeaderInfo.responseMessage,
          "error-toast"
        );
      }
    }
  }
}
