import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { BaseResponseModel } from "../interface/types";
import { GhanaCardDataResponse } from "../pages/ghana-card/interface";

@Injectable({ providedIn: "root" })
export class ApiService {
  readonly hostHeaderInfo = {
    requestId: "77779",
    ipAddress: "127.0.0.1",
    sourceChannelId: "",
  };

  token: any;
  private BASE_URL = "/";
  private AUTH_URL = "/";
  // private getDashboard = `${this.BASE_URL}/SIMSOnboarding/api/v1/request/bystatus`;
  private getRequestById = `${this.BASE_URL}/SIMSOnboarding/api/v1/request/details`;
  private approveApplication = `${this.BASE_URL}/SIMSOnboarding/api/v1/request/approve`;
  private rejectApplication = `${this.BASE_URL}/SIMSOnboarding/api/v1/request/reject`;
  private getAllRequest = `${this.BASE_URL}/SIMSOnboarding/api/v1/request/all`;
  private addIssuesToLookUp = `${this.BASE_URL}/SIMSOnboarding/api/v1/lookup/add`;
  private getIssuesLookup = `${this.BASE_URL}/SIMSOnboarding/api/v1/lookup/allreasons`;

  private ghanaCardData = `${this.BASE_URL}/SIMSGhanaCardVerification/services/getalldatalist/`;
  private updateCardStatus = `${this.BASE_URL}/SIMSGhanaCardVerification/services/auth`;

  private httpHeaders = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("sourceCode", "SIMS ONBOARDING")
    .set("Access-Control-Allow-Origin", "*")
    .set("Content-Security-Policy", "script-src 'self'")
    .set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    .set(
      "X-IBM-Client-Secret",
      "jE1yI1pS6rP0kX1xT2pP3hQ6bY7mX1jJ3rW2xR8lN0hM7wX7tH"
    )
    .set("requestToken", "jE1yI1pS6rP0kX1xT2pP3hQ6bY7mX1jJ3rW2xR8lN0hM7wX7tH")
    .set("X-IBM-Client-Id", "25bea38f-8aa5-4f7b-b50b-b9ab6ea6c830")
    .set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    .set("Content-Type", "application/json")
    .set("countryCode", "GH")
    .set("X-User-Type", "Staff")
    .set("Cache-Control", "no-cache");

  private options = {
    headers: this.httpHeaders,
  };

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  /**
   *  @description get User token from storage service
   *  @method none
   *  @body ** data =
   */
  public getUserToken() {
    const userData = this.storageService.getData();
    this.token = userData.token;
    this.options.headers = this.options.headers.set(
      "Authorization",
      `Bearer ${this.token}`
    );
  }

  /**
   *
   * @description Create new convenant
   * @method POST
   * @body **
   */
  public authenticateUser(data: any) {
    return this.http.post(
      this.AUTH_URL,
      data,
      this.options
    ) as Observable<BaseResponseModel>;
  }

  /**
   *
   * @param data
   * @returns
   */

  public getAllRequests() {
    this.getUserToken();
    // let payload = JSON.stringify(data);
    let data = { hostHeaderInfo: this.hostHeaderInfo };
    return this.http.post(
      this.getAllRequest,
      data,
      this.options
    ) as Observable<BaseResponseModel>;
  }

  public addIssuesToLookup() {
    this.getUserToken();
    let data = { hostHeaderInfo: this.hostHeaderInfo };
    return this.http.post(
      this.addIssuesToLookUp,
      data,
      this.options
    ) as Observable<BaseResponseModel>;
  }

  public getIssuesList() {
    this.getUserToken();
    let data = { hostHeaderInfo: this.hostHeaderInfo };
    return this.http.get(
      this.getIssuesLookup,
      this.options
    ) as Observable<BaseResponseModel>;
  }

  /**
   *
   * @param id
   * @returns
   */
  public fetchAllRequestById(regRequestId: any) {
    this.getUserToken();
    let data = { ...regRequestId, hostHeaderInfo: this.hostHeaderInfo };
    return this.http.post(
      this.getRequestById,
      data,
      this.options
    ) as Observable<BaseResponseModel>;
  }

  /**
   *
   * @param data
   * @param id
   * @returns
   */

  public approveRequest(payload: any) {
    this.getUserToken();
    let data = { ...payload, hostHeaderInfo: this.hostHeaderInfo };
    return this.http.post(
      this.approveApplication,
      data,
      this.options
    ) as Observable<BaseResponseModel>;
  }

  /**
   * @description reject application
   * @param payload
   * @returns
   */
  public rejectRequest(payload: any) {
    this.getUserToken();
    let data = { ...payload, hostHeaderInfo: this.hostHeaderInfo };
    return this.http.post(
      this.rejectApplication,
      data,
      this.options
    ) as Observable<BaseResponseModel>;
  }

  getGhanaCardDashboardData(
    offset: number,
    limit: number,
    status: "Approved" | "Rejected" | "ALL" | "PENDING" = "ALL"
  ) {
    this.getUserToken();

    return this.http.get(
      this.ghanaCardData + `${offset}/${status}`,
      this.options
    ) as Observable<GhanaCardDataResponse>;
  }

  getSearchData(offset = 1, limit = 10, term = "") {
    this.getUserToken();
    return this.http.post(
      `${this.BASE_URL}search/services`,
      {
        type: "GHA-CARD SETUP",

        term: term,
        page: offset,
        size: limit,
      },
      {
        headers: this.options.headers,
      }
    );
  }

  getClientData(id: number, cif: any) {
    this.getUserToken();
    let params;
    if (cif) {
      params = new HttpParams()
        .set("type", "GHA-CARD SETUP")
        .set("cif", cif)
        .set("size", 10)
        .set("page", 1);
    } else {
      params = new HttpParams()
        .set("type", "GHA-CARD SETUP")
        .set("id", id)
        .set("size", 10)
        .set("page", 1);
    }
    return this.http.get("this.dataRequests" + params, this.options);
  }

  excelDownload(dates: string[]) {
    this.getUserToken();
    const params = new HttpParams()
      .set("startDate", dates[0])
      .set("endDate", dates[1]);
    return this.http.get("this.docDownload" + params, {
      observe: "response",
      responseType: "blob",
      headers: this.httpHeaders,
    });
  }

  updateStatus(data: {
    staffId: string;
    status: "REJECTED" | "APPROVED";
    accNo: string;
    comments: string;
    headerRequest?: any;
  }) {
    this.getUserToken();
    data["headerRequest"] = {
      requestId: Math.floor(Math.random() * 100000),
      ipAddress: "127.0.0.1",
      sourceChannelId: "WEB",
    };
    return this.http.post(this.updateCardStatus, data, this.options);
  }
}
