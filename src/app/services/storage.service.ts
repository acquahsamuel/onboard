import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class StorageService {
  userRole: any;
  private _editForm: boolean;

  constructor(private cookieService: CookieService, private router: Router) {
    this.userRole = {
      role: "",
    };
  }

  saveUserData(data: any) {
    const userData = JSON.stringify(data);
    this.cookieService.set("userObj", userData);
  }

  get editForm(): boolean {
    return this._editForm;
  }

  set editForm(value: boolean) {
    this._editForm = value;
  }

  getData() {
    const userData = this.cookieService.get("userObj");
    if (userData) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  }

  deleteCookie() {
    this.cookieService.delete("userObj");
  }

  loggedIn(): boolean {
    return this.cookieService.check("userObj");
  }

  getUserRole() {
    if (this.cookieService.get("userObj")) {
      const userData = JSON.parse(this.cookieService.get("userObj"));
      if (userData.apps) {
        this.userRole = userData.apps.find(
          (el: any) => el.app === environment.app
        )?.role;
      }
      return this.userRole;
    } else {
      return this.userRole;
    }
  }

  clearAllData() {
    this.cookieService.deleteAll("/");
  }

  logout() {
    this.cookieService.delete("userObj");
    this.router.navigate(["/login"]);
  }
}
