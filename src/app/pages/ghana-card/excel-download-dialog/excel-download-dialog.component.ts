import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from "moment";
import { ToastService } from "src/app/services/toast.service";
import {
  ReviewDialog,
  DialogData,
} from "../review-dialog/review-dialog.component";

@Component({
  selector: "app-excel-download-dialog",
  templateUrl: "./excel-download-dialog.component.html",
  styleUrls: ["../details/details.component.scss"],
})
export class ExcelDownloadDialogComponent implements OnInit {
  _startDate: any;
  _endDate: any;

  @Output() done = new EventEmitter();
  constructor(
    private toast: ToastService,
    public dialogRef: MatDialogRef<ExcelDownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  download() {
    if (!this._startDate || !this._endDate) {
      return this.toast.showToast(
        "please provide a start and end date",
        "error-toast"
      );
    }
    this.done.emit([
      moment(this._startDate).format("DD/MM/YYYY"),
      moment(this._endDate).format("DD/MM/YYYY"),
    ]);
    this.dialogRef.close();
  }
}
