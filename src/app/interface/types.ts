/**
 * @author <a href="mailto:stanbic@"
 * @date 2022-04-2022
 * @description this is convenant diaries interface
 *
 */
 export type SIMSStatus = 'REVIEW' | 'APPROVED'  | 'REJECTED';
import { Validators } from "@angular/forms";
/**
 * Host header interface
 */
export interface IHostHeaderInfo {
  ipAddress?: string;
  requestId?: string;
  sourceChannelId?: string;
}



export interface DASHBOARDDATA {
  id?: string;
  regRequestId: string,
  firstName: string,
  otherNames: string
  lastNames: string, 
  submissionDate: string,
  time: string,
  investmentType: string,
  status : string
}

export interface IDashboardModel {}

export interface IReassignApp {
  appid: string;
  rmSap: string;
}


/**
 * Attachments for the host header
 */
export class hostHeaderInfo {
  sourceCode: string = "SIMSONBOARDING";
  requestId: string = "1";
  ipAddress: string = "127.0.0.1";
  sourceChannelId: string = "WEB";
  countryCode: string = "GH";
}

export class ErrorModel {
  hostHeaderInfo?: {
    responseCode: string;
    responseMessage: string;
  };
}

export class UserData {
  initials?: string;
  userID?: string;
  apps: any;
  token: any;
  name: any;
  email: any;
}

export class LoginModel {
  username = ["", Validators.required];
  password = ["", Validators.required];
}

export class _LoginModel {
  username!: string;
  password!: string;
}



export interface SideBarData {
  name: string;
  show: boolean;
  children: SideBarItem[];
}


export interface SideBarItem {
  count: number;
  name: string;
}



export interface IHeaderRequest {
  ipAddress?: string;
  requestId?: string;
  sourceChannelId?: string;
}

export interface HostHeaderInfoResponse {
  sourceCode: string;
  requestId: string;
  countryCode: string;
  responseCode: string;
  responseMessage: string;
}

export interface BaseResponseModel {
  hostHeaderInfo: HostHeaderInfoResponse;
}
