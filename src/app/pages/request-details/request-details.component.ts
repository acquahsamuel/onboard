import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
// import { FormsDataService } from "src/app/services/forms-data.service";
import { LoaderService } from "src/app/services/loader.service";
import { ToastService } from "src/app/services/toast.service";
import { ReviewDialog } from "src/app/Dialogs/review-dialog/review-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { RejectDialogComponent } from "src/app/Dialogs/reject-dialog/reject-dialog.component";

@Component({
  selector: "app-request-details",
  templateUrl: "./request-details.component.html",
  styleUrls: ["./request-details.component.scss"]
})
export class RequestDetailsComponent implements OnInit {
  public isData: boolean = false;
  public sideBarOpen: boolean = true;
  public loading: false;
  public completed = 10;
  public regRequestId : any;
  public alert = false;
  public showDetails = false;
  public nav: any;
  public labels: Array<any>;
  public labelsLength: any;
  public lastLabelIndex: any;
  public status: any;
  public resp : any;

  constructor(
    private toast: ToastService,
    public loader: LoaderService,
    public apiService: ApiService,
    public router: Router,
    private fb: FormBuilder,
    private dialog : MatDialog,
    public activatedRoute: ActivatedRoute
  ) {
    this.labels = [
      "Client Profile",
      "Account Type",
      "Payment Details",
      "Beneficiary Details",
      "Investment Details",
      "Expected Account Activity",
      "Additional Information",
      "Consent",
      "Documents"
    ];
    this.nav = 0;
  }

  ngOnInit(): void {
    this.regRequestId =  this.activatedRoute.snapshot.params['id'];
    this.labelsLength = this.labels.length;
    this.lastLabelIndex = this.labelsLength - 1;
    this.loadSingleRequest();
  }

  public getPercentageCompleted(nav: any) {
    var len = this.labels.length;
    this.completed = Math.round((nav / len) * 100);
  }

  public next() {
    this.nav++;
    this.getPercentageCompleted(this.nav + 1);
    this.status = "next";
  }

  public back() {
    this.nav--;
    this.getPercentageCompleted(this.nav + 1);
    this.status = "back";
  }

  public rejectRequest() {}

  

  public loadSingleRequest(){
    //pass payload
    let payload = {
      regRequestId: this.regRequestId, 
    }
    this.apiService.fetchAllRequestById(payload).subscribe(v =>{
      if(v.hostHeaderInfo.responseCode === '000'){
        // console.log(v);
        this.resp = v;
        this.isData = true;
      }else{
        this.toast.showToast(v.hostHeaderInfo.responseMessage, 'error-toast');
      }
    })
  }








  /**
   * Refactor
   */
  public approveApplication() {
    const dialogRef = this.dialog.open(ReviewDialog, {
      width: '450px',
      data: { customeridx: this.regRequestId},
    });
    dialogRef.afterClosed().subscribe((result) => {
      const data = {
        regRequestId : this.regRequestId,
        comment : result.comment,
        reason: result.reason
      };
      this.apiService.approveRequest(data).subscribe((v) => {
          this.resp = v;
          if (v.hostHeaderInfo.responseCode === '000') {
             this.router.navigate(['/dashboard']);
            this.toast.showToast(`The application has been successfully approved`, 'success-toast');
          }else if(v.hostHeaderInfo.responseCode === 'A35'){
            this.toast.showToast(`The application has already been approved`, 'success-toast');
            this.router.navigate(['/dashboard']);
          }else {
            this.toast.showToast(`Oops sorry something happened try agian`,'error-toast'
            );
          }
        });
    });
  }


  /**
   * Todo 
   * Refactor component
   */
  public rejectApplication(){
    const dialogRef = this.dialog.open(RejectDialogComponent, {
      width: '450px',
      data: this.regRequestId
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(result);
    //   const data = {
    //     regRequestId : this.regRequestId,
    //     comment : result.comment || null,
    //     reason: result.reason || null
    //   };
    //   this.apiService.rejectRequest(data).subscribe((v) => {
    //       this.resp = v;
    //       if (this.resp.hostHeaderInfo.responseCode === '000') {
    //          this.router.navigate(['/dashboard']);
    //         this.toast.showToast(`The application has been successfully rejected `, 'success-toast');
    //       } else if(v.hostHeaderInfo.responseCode === 'A35'){
    //         this.toast.showToast('Request already in processing', 'success-toast');
    //         this.router.navigate(['/dashboard']);
    //       }else {
    //         this.toast.showToast(`Oops sorry something happened try agian`,'error-toast'
    //         );
    //       }
    //     });
    // }); 
  }
}
