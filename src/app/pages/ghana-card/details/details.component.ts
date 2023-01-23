import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ReviewDialog } from "../review-dialog/review-dialog.component";
import { ApiService } from "src/app/services/api.service";
import { IconService } from "src/app/services/icon-farm.service";
import { LoaderService } from "src/app/services/loader.service";
import { ToastService } from "src/app/services/toast.service";
import { CLIENTDATA } from "../interface";
import { EventServiceService } from "src/app/services/EventService.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  isData: boolean = true;
  stage!: number;
  errorMessage!: string;
  sideBarOpen: boolean = true;
  ID: any = null;
  cifNumber: any = null;
  staffId: string;
  search: boolean = false;
  clientData!: CLIENTDATA | null;

  constructor(
    private toast: ToastService,
    public loader: LoaderService,
    public router: Router,
    public icon: IconService,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private eventService: EventServiceService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.eventService.cardData.subscribe((v) => {
      this.clientData = v;
      this.isData = true;
      this.stage = 1;
      this.ID = parseInt(v?.acc ?? "0");
      this.staffId = this.storage.getData()?.userID;
      if (!v) {
        this.router.navigate(["/ghana-card"]);
      }
    });

    // this.activatedRoute.params.subscribe((params) => {
    //   switch (params["SEARCH"]) {
    //     case "search":
    //       this.stage = 0;
    //       this.isData = true;
    //       this.search = true;
    //       break;
    //     default:
    //       this.ID = parseInt(params["ID"]);
    //       this.search = false;
    //       this.stage = 1;
    //       // this.getClientDetails();
    //       break;
    //   }
    // });
  }

  // getClientDetails() {
  //   if (this.search && this.cifNumber.length < 11) {
  //     return this.toast.showToast(
  //       "Please enter a valid CIF number",
  //       "neutral-toast"
  //     );
  //   }
  //   this.apiService.getClientData(this.ID, this.cifNumber).subscribe(
  //     (res: any) => {
  //       switch (res.hostHeaderInfo.responseCode) {
  //         case "000":
  //           this.isData = true;
  //           this.stage = 1;
  //           this.clientData = res.serviceInfo[0];
  //           // this.clientData.idCardImageUrl = this.clientData.idCardImageUrl.replace('https://ghuatgodigisrv1.gh.sbicdirectory.com:7102/','https://e.uat.stanbic.com.gh/apis/')
  //           break;
  //         case "A03":
  //           this.isData = false;
  //           this.errorMessage = "No record found";
  //           break;
  //         default:
  //           this.isData = false;
  //           this.toast.showToast(
  //             res.hostHeaderInfo.responseMessage,
  //             "error-toast"
  //           );
  //           this.errorMessage = "Sorry there was an error";
  //           break;
  //       }
  //     },
  //     (err) => {
  //       this.isData = false;
  //       this.errorMessage = "Sorry there was an error";
  //     }
  //   );
  // }

  updateStatus(status: "APPROVED" | "REJECTED", comments: string) {
    let data = {
      accNo: this.clientData!.acc,
      status: status,
      comments: "comments",
      staffId: this.staffId,
    };
    this.apiService.updateStatus(data).subscribe((res: any) => {
      switch (res.headerResponse.responseCode) {
        case "000":
          this.toast.showToast(
            `Request has been ${status.toLowerCase()} successfully`,
            "success-toast"
          );
          setTimeout(() => {
            this.router.navigate(["/ghana-card"]);
          }, 2000);
          break;
        default:
          this.toast.showToast(
            res.headerResponse.responseMessage,
            "error-toast"
          );
          break;
      }
    });
  }

  review() {
    const dialogRef = this.dialog.open(ReviewDialog, {
      width: "420px",
    });
    dialogRef.componentInstance.onSubmit.subscribe((data) => {
      this.updateStatus(data.status, data.comments);
    });
  }
}
