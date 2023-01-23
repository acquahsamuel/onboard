import { Injectable } from '@angular/core';
import { UserData, ErrorModel } from '../interface/types';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public ErrorModel: ErrorModel;
  public UserData: UserData;
  authResp: any;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private storageService: StorageService
  ) {
    this.authResp = '';
    this.ErrorModel = new ErrorModel();
    this.UserData = new UserData();
  }

  async validateUser(data: any) {
    try {
      let res = await this.apiService.authenticateUser(data).toPromise();
      this.authResp = res;

      if (this.authResp.hostHeaderInfo.responseCode === '000') {
        const firstName = this.authResp.staffInfo.firstName;
        const lastName = this.authResp.staffInfo.lastName;
        const initials = firstName.slice(0, 1) + lastName.slice(0, 1);
        this.UserData.initials = initials;


        const staffNo = this.authResp.staffInfo.staffNo;
        this.UserData.userID = staffNo;
        this.UserData.token = this.authResp.token;
        
        // this.UserData.apps = this.authResp.role;
        this.UserData.email = this.authResp.staffInfo.email;
        this.UserData.name = `${this.authResp.staffInfo.firstName} ${this.authResp.staffInfo.lastName}`;
        console.log(this.UserData);

        this.storageService.saveUserData(this.UserData);
      }
      return res;
    } catch (error) {
      let resp = {
        responseCode: 'EEE',
        responseMessage: 'Please try again later',
      };
      let respData = {
        hostHeaderInfo: resp,
      };
      return respData;
    }
  }
}
