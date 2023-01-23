import { Component, Inject, EventEmitter, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastService } from "../../services/toast.service";

export interface IApprove {
  comment : string;
  statuses : string[]
  reason : string;
}

@Component({
  selector: "review-dialog",
  templateUrl: "review-dialog.html",
  styleUrls: ["review-dialog.scss"]
})
export class ReviewDialog {
  // reasons: [];
  reason: string = "";
  comment: string = "";
  statuses: string[] = [
    "Documents not sighted",
    "ID not sighted",
    "ID not GVIVE'D /verified'",
    "TIN not verified",
    "Forms not properly completed",
    "Date of birth on form and id differ",
    "No proof of residence"
  ];
  constructor(
    private toast: ToastService,
    public dialogRef: MatDialogRef<ReviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IApprove
  ) {}

  ngOnInit(): void {
    // this.statuses = this.data.statuses;
  }
  closeDialog(): void {
    this.dialogRef.close({data : this.data });
  }

  respond() {
    this.dialogRef.close({ data: this.data });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
