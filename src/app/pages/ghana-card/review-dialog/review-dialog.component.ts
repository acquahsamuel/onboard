import { Component, Inject, EventEmitter, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastService } from "src/app/services/toast.service";

export interface DialogData {
  statuses: [];
  type: string;
}

export const MY_FORMATS = {
  parse: {
    dateInput: "MM/YYYY",
  },
  display: {
    dateInput: "MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
@Component({
  selector: "review-dialog",
  templateUrl: "review-dialog.html",
  styleUrls: ["../details/details.component.scss"],
})
export class ReviewDialog {
  // type = 'Review'
  // exportFormat
  showOther = false;
  type: any;
  approve: any;
  comment!: string;
  selectedReason!: string;
  reasons = [
    "Same side of ID scanned (back view)",
    "Duplicate update",
    "Blur image of ID uploaded",
    "Wrong image captured",
    "Incomplete email address",
    "GH card ID DOB different from that provided on application form",
    "Difference in name on ID card and application form",
  ];
  @Output() onSubmit = new EventEmitter();

  constructor(
    private toast: ToastService,
    public dialogRef: MatDialogRef<ReviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  showOtherHandler() {
    this.showOther = this.selectedReason == "Other";
    this.showOther ? (this.selectedReason = "") : "";
  }

  respond(status: "APPROVED" | "REJECTED") {
    if (status == "REJECTED" && !this.selectedReason) {
      this.toast.showToast("Please provide a reason", "neutral-toast");
    } else {
      this.onSubmit.emit({
        status: status,
        comments: this.selectedReason,
      });
      this.dialogRef.close();
    }
  }
}
