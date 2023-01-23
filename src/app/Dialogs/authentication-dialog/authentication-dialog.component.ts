import { Component, OnInit, Inject, ɵConsole, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StorageService} from '../../services/storage.service';
import {LoginModel} from '../../interface/types';
import {AuthService} from '../../services/auth.service';
import { ToastService } from 'src/app/services/toast.service';


export interface AuthenticationDialogData {
  username: string;
  password:string;
}


@Component({
  selector: 'app-authentication-dialog',
  templateUrl: './authentication-dialog.component.html',
  styleUrls: ['./authentication-dialog.component.scss']
})
export class AuthenticationDialogComponent implements OnInit {

  public loginModel: LoginModel;
  loader=true;
  userData:any;
  loading=false;
  authResp:any;

  // alert = false;
  // alertType = true;
  // alertMessage = '';

  @Output() onSuccess= new EventEmitter();
  constructor(
    private authService: AuthService,
    private toast: ToastService,
    public dialogRef: MatDialogRef<AuthenticationDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: AuthenticationDialogData,public storageService:StorageService) {
    this.loginModel = new LoginModel();
  }

  ngOnInit() {

    this.getUserData();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getUserData(){
    this.userData   = this.storageService.getData();
    console.log(this.userData);
    this.loginModel.username = this.userData.userID;

  }
  // toast(messageType: boolean, msg: string) {
  //   this.alert = true;
  //   this.alertMessage = msg;
  //   this.alertType = messageType;
  //   setTimeout(() => {
  //     this.alert = false;
  //   }, 3000)
  // }
  // onHandleAlert() {
  //   this.alert = false
  // }

  async login(){
    this.loading = true;
    this.loader = true;
    this.loader = true;
    const data = JSON.stringify(this.loginModel);
    this.authResp = await this.authService.validateUser(data);
    if(this.authResp.hostHeaderInfo.responseCode === "000"){
      this.onSuccess.emit('000');
      this.loader = false;
      this.toast.showToast("Authentication Successful","success-toast");
      this.dialogRef.close();
    }else if(this.authResp.hostHeaderInfo.responseCode === "A05"){
      this.loader = false;
      this.loading = false;
      this.toast.showToast("Invalid User Credentials",'error-toast')
    }else{
      this.loader = false;
      this.loading = false;
      this.toast.showToast(this.authResp.hostHeaderInfo.responseMessage,'error-toast')
    }
  }

}
