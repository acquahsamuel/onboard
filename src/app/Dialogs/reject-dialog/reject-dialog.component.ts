import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { ToastService } from "src/app/services/toast.service";
import { ReviewDialog } from "../review-dialog/review-dialog.component";

export interface IReject {
  comment: string;
  statuses: string[];
  reasons: string[];
}

@Component({
  selector: "app-reject-dialog",
  templateUrl: "./reject-dialog.component.html",
  styleUrls: ["./reject-dialog.component.scss"]
})
export class RejectDialogComponent {
  reasonsList : any;
  description: string;
  type: string;
  Loading: boolean;
  rejectionForm: FormGroup;
  rejectReqId : any;
  resp : any;


  constructor(
    private toast: ToastService,
    private fb: FormBuilder,
    private apiService: ApiService,
    public router: Router,
    public dialogRef: MatDialogRef<ReviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IReject
  ) {
    this.rejectionForm = this.fb.group({
        reason: ["", Validators.required],
        comments: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.issuesLookGet();
    this.rejectReqId = this.data;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  respond() {
    this.dialogRef.close({ data: this.data });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // issuesLookAdd() {
  //   this.apiService.addIssuesLookup().subscribe((v: any) => {
  //     if (v.hostHeaderInfo.responseCode === "000") {
  //     } else {
  //       this.toast.showToast("Lookup failed", "error-toast");
  //     }
  //   });
  // }


  issuesLookGet() {
    this.apiService.getIssuesList().subscribe((v: any) => {
      this.Loading = false;
      if (v.hostHeaderInfo.responseCode === "000") {
        this.reasonsList = v?.reasons;
        console.log(this.reasonsList);
        this.toast.showToast("Issue list fetched successfully", "success-toast");
      } else {
        this.toast.showToast("Lookup failed", "error-toast");
      }
    });
  }

  submit(){
    if(!this.rejectionForm.value){
      return;
    };
    this.rejectRequest();
  }

  rejectRequest() {
    let data = {
      regRequestId : this.rejectReqId,
      rejectReasons: [this.rejectionForm.value]
    };
   
       this.apiService.rejectRequest(data).subscribe((v) => {
          this.resp = v;
          if (this.resp.hostHeaderInfo.responseCode === '000') {
             this.router.navigate(['/dashboard']);
            this.toast.showToast(`The application has been successfully rejected `, 'success-toast');
            this.closeDialog();
          } else if(v.hostHeaderInfo.responseCode === 'A35'){
            this.toast.showToast('Request already in rejected', 'success-toast');
            this.router.navigate(['/dashboard']);
            this.closeDialog();
          }else {
            this.toast.showToast(`Oops sorry something happened try agian`,'error-toast'
            );
          }
        });
  }
}
