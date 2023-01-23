import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router, NavigationEnd, Route, ActivatedRoute } from "@angular/router";
import * as moment from "moment";

//MATERIAL
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { DateAdapter } from "@angular/material/core";

//SERVICES

import { LoaderService } from "src/app/services/loader.service";
import { IconService } from "src/app/services/icon-farm.service";

//MODELS

import { HttpErrorResponse } from "@angular/common/http";
import { ExcelDownloadDialogComponent } from "../excel-download-dialog/excel-download-dialog.component";
import { environment } from "src/environments/environment";
import { ApiService } from "src/app/services/api.service";
import { ToastService } from "src/app/services/toast.service";
import { StorageService } from "src/app/services/storage.service";
import { CLIENTDATA } from "../interface";
import { UserData } from "src/app/interface/types";
import { EventServiceService } from "src/app/services/EventService.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  assetPreloader = environment.assetPreLoader;
  displayedColumns?: string[] = [
    "firstname",
    "acc",
    "status",
    "modifiedDate",
    "comments",
    "createdDate",
  ];

  dataSource: MatTableDataSource<CLIENTDATA>;
  // requestDataSource: any;
  sideBarOpen = true;
  dataLength?: number;

  todayDate: Date = new Date();
  startDate: any = "01/05/2019";
  endDate: any = "31/05/2019";
  recordType!: string;

  nav: any;
  userRole: any = "";
  userData!: UserData;

  tableData: CLIENTDATA[] = [];
  totalItems = 0;
  // transactionDetails = { date: '', particulars: '' };

  comment: any;
  loading: Boolean = false;
  isData = false;
  user: any;
  errorMessage: any;
  relatives: any = {};
  waitStatus: any = {};

  excelLink: any;
  searchTerm = "";
  // changeDetails = (transactionDetails: any) =>
  //   (this.transactionDetails = transactionDetails);
  sideNav = [
    {
      name: "Requests",
      show: true,
      children: [
        { name: "All" },
        { name: "Pending" },
        { name: "Approved" },
        { name: "Rejected" },
      ],
    },
  ];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    public loaderService: LoaderService,
    private apiService: ApiService,
    public iconService: IconService,
    private toast: ToastService,
    public router: Router,
    public storageService: StorageService,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    private route: ActivatedRoute,
    private eventService: EventServiceService
  ) {
    this.dateAdapter.setLocale("en-GB");

    this.dataSource = new MatTableDataSource<CLIENTDATA>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: any, property: any) => {
      switch (property) {
        case "createdDate":
          const newDate = new Date(item.createdDate);
          return newDate;
        case "modifiedDate":
          const _newDate = new Date(item.modifiedDate);
          return _newDate;
        default:
          return item[property];
      }
    };
  }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = "Rows per page";
    this.nav = "All";
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.paginator.page.subscribe((event) => {
      if (this.searchTerm === "") {
        this.getDashboardData(event.pageIndex + 1, event.pageSize);
      } else {
        this.getSearchData(1, this.paginator.pageSize, this.searchTerm);
      }
    });

    this.getDashboardData(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize
    );
  }
  // pageIndex: number = 0;
  // pageSize: number = 50;
  // lowValue: number = 0;
  // highValue: number = 50;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
    return this.sideBarOpen;
  }

  // setDashBoardData() {
  //   this.dataLength = this.tableData.length;
  //   this.dataSource;
  // }

  filter(e: any) {
    this.searchTerm = e;
    console.log(e);
    this.paginator.pageIndex = 0;
    if (this.searchTerm === "") {
      this.getDashboardData(
        this.paginator.pageIndex + 1,
        this.paginator.pageSize
      );
    } else this.getSearchData(1, this.paginator.pageSize, e);
  }

  changeComment(comment: string) {
    this.comment = comment;
  }
  getRelativeTime(expectedDate: any, id: any) {
    this.relatives[id] = moment(expectedDate).fromNow(true) + " ago";
    this.waitStatus[id] = moment().diff(moment(expectedDate), "hours");
  }

  getDashboardData(offset = 1, limit = 50, status?: any) {
    this.apiService.getGhanaCardDashboardData(offset, limit, status).subscribe(
      (res) => {
        if (res.headerResponse.responseCode == "000") {
          this.isData = true;
          this.tableData = res.dataList;
          this.paginator.length = res.totalRecords;
          this.totalItems = res.totalRecords;
          this.dataSource.data = res.dataList;
          this.dataSource.connect();
          // this.setDashBoardData();
        } else {
          this.toast.showToast(
            res.headerResponse.responseMessage,
            "error-toast"
          );
          this.noDashBoardData();
        }
      },
      (err) => {
        this.noDashBoardData();
      }
    );
  }

  getSearchData(offset = 1, limit = 50, term: string) {
    this.apiService.getSearchData(offset, limit, term).subscribe(
      (res: any) => {
        if (res.hostHeaderInfo.responseCode == "000") {
          this.isData = true;
          this.tableData = res.serviceInfo;
          this.paginator.length = res.total;
          this.totalItems = res.total;
          this.dataSource.data = res.serviceInfo;
          this.dataSource.connect();
          // this.setDashBoardData();
        } else {
          this.toast.showToast(
            res.hostHeaderInfo.responseMessage,
            "error-toast"
          );
          this.noDashBoardData();
        }
      },
      (err) => {
        this.noDashBoardData();
      }
    );
  }

  view(e: any) {
    this.getDashboardData(
      undefined,
      undefined,
      e === "NEW" ? "PENDING" : String(e).toUpperCase()
    );
  }

  noDashBoardData() {
    this.errorMessage = "Sorry there are no records";
    this.loading = false;
    this.isData = false;
    this.tableData = [];
  }

  excelDownload() {
    let dialog = this.dialog.open(ExcelDownloadDialogComponent);
    dialog.componentInstance.done.subscribe((res) => {
      this.loading = true;
      this.apiService.excelDownload(res).subscribe(
        (res: any) => {
          this.loading = false;
          let filename: string = `DATA CLEANUP DATA from ${res[0]} to ${res[1]}.xls`;
          let binaryData = [];
          binaryData.push(res.body);
          let downloadLink = document.createElement("a");
          downloadLink.href = window.URL.createObjectURL(
            new Blob(binaryData, { type: "blob" })
          );
          downloadLink.setAttribute("download", filename);
          document.body.appendChild(downloadLink);
          downloadLink.click();
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status == 409) {
            this.toast.showToast("No records found", "neutral-toast");
          } else {
            this.toast.showToast(
              "There was an error, please try again",
              "error-toast"
            );
          }
        }
      );
    });
  }
  goTo(row: any) {
    this.eventService.setCardData(row);
    this.router.navigate([`details/client/${row.id}`], {
      relativeTo: this.route,
    });
  }
}
