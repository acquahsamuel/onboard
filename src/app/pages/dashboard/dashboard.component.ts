import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { SelectionModel } from "@angular/cdk/collections";
import * as moment from "moment";
import { environment } from "../../../environments/environment";

//MATERIAL
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { DateAdapter } from "@angular/material/core";

//SERVICES
import { StorageService } from "../../services/storage.service";
import { ApiService } from "../../services/api.service";
import { ToastService } from "../../services/toast.service";
import { LoaderService } from "src/app/services/loader.service";
import { IconService } from "src/app/services/icon-farm.service";

//MODELS
import { UserData, DASHBOARDDATA, SideBarData } from "../../interface/types";
import { STATUSES } from "src/app/interface/RConstants";
import { FormControl, FormGroup } from "@angular/forms";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  public dataSource: any;
  public sideBarOpen = true;
  public dataLength?: Number;
  public nav: any;
  public userRole: any = "";
  public searchStartDate = "";
  public searchEndDate = "";
  public tableData: DASHBOARDDATA[] = [];
  public comment: string;
  public loading: Boolean = false;
  public isData = false;
  public searchFiltering: FormGroup;
  public edit: true;
  public user: any;
  public errorMessage: any;
  public relatives: any = {};
  public waitStatus: any = {};
  public id: any;
  public resp: any;
  public assetPreloader = environment.assetPreLoader;
  public displayedColumns?: string[] = [
    "firstName",
    "otherNames",
    "lastNames",
    "investmentType",
    "time",
    "submissionDate",
  ];
  public sideBarData: SideBarData[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  sideNav = [
    {
      name: "Requests",
      show: true,
      children: [{ name: "New" }, { name: "Approved" }, { name: "Rejected" }],
    },
  ];
  constructor(
    private apiService: ApiService,
    private dateAdapter: DateAdapter<Date>,
    private toast: ToastService,
    public iconService: IconService,
    public loaderService: LoaderService,
    public router: Router,
    public store: StorageService,
    public dialog: MatDialog,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    public activatedRoute: ActivatedRoute
  ) {
    this.dateAdapter.setLocale("en-GB");
  }

  ngOnInit(): void {
    // this.getDashboardData('REVIEW');
    this.paginator._intl.itemsPerPageLabel = "Rows per page";
    this.nav = "New";
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.searchFiltering = new FormGroup({
      startSearchDate: new FormControl(""),
      endSearchDate: new FormControl(""),
    });
    this.getDashboardData();
  }
  pageIndex: number = 0;
  pageSize: number = 50;
  lowValue: number = 0;
  highValue: number = 50;

  public sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
    return this.sideBarOpen;
  }

  public setDashBoardData() {
    this.dataLength = this.tableData.length;
    this.dataSource = new MatTableDataSource<DASHBOARDDATA>(this.tableData);
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
    this.view(this.nav);
  }

  public filter(e: any) {
    this.dataSource.filter = e.trim().toLowerCase();
  }

  public changeComment(comment: string) {
    this.comment = comment;
  }

  public getRelativeTime(expectedDate: any, id: any) {
    this.relatives[id] = moment(expectedDate).fromNow(true) + " ago";
    this.waitStatus[id] = moment().diff(moment(expectedDate), "hours");
  }

  public getDashboardData() {
    this.apiService.getAllRequests().subscribe(
      (res: any) => {
        console.log(res);
        if (res.hostHeaderInfo.responseCode == "000") {
          this.isData = true;
          this.tableData = res.requests;
          // console.log(this.tableData);
          this.tableData = res.requests.map((el: any) => ({
            ...el,
            status: el.status,
          }));
          this.setDashBoardData();
          this.sortData();
        } else {
          this.toast.showToast(
            res.hostHeaderInfo.responseMessage,
            "error-toast"
          );
          // this.noDashBoardData();
        }
      },
      (err) => {
        // this.noDashBoardData();
      }
    );
  }

  /**
   *
   * @param e
   */
  public view(e: any) {
    console.log(e);
    let a!: DASHBOARDDATA[];
    let stats: any;
    this.nav = e.toUpperCase();
    this.isData = true;
    this.loading = false;
    switch (this.nav) {
      case "NEW":
        a = this.tableData.filter((el) => el.status == STATUSES.REVIEW);
        this.dataSource = new MatTableDataSource<DASHBOARDDATA>(a);
        break;
      case "APPROVED":
        a = this.tableData.filter((el) => el.status == STATUSES.APPROVED);
        this.dataSource = new MatTableDataSource<DASHBOARDDATA>(a);
        break;
      case "REJECTED":
        a = this.tableData.filter((el) => el.status == STATUSES.REJECTED);
        this.dataSource = new MatTableDataSource<DASHBOARDDATA>(a);
        break;
      default:
      // this.dataSource = new MatTableDataSource<DASHBOARDDATA>(
      //   this.tableData
      // );
      // break;
    }
    if (this.nav == "New" ? this.tableData.length == 0 : a.length == 0) {
      this.isData = false;
      this.errorMessage = "Sorry there are no records";
    } else this.isData = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * @description sorting and counting
   */
  public sortData() {
    const pending = this.tableData.filter((el) => el.status == STATUSES.REVIEW);
    // this.sideBarData[0].children[0].count = pending.length;

    const approved = this.tableData.filter(
      (el) => el.status == STATUSES.APPROVED
    );
    // this.sideBarData[0].children[1].count = approved.length;

    const rejected = this.tableData.filter(
      (el) => el.status == STATUSES.REJECTED
    );
    // this.sideBarData[0].children[2].count = rejected.length;
  }

  /**
   * @description getting dashboard data
   */
  public noDashBoardData() {
    this.errorMessage = "Sorry there are no records";
    this.loading = false;
    this.isData = false;
    this.tableData = [];
  }

  public goTo(row: any) {
    this.router.navigate([`/application/request-details/${row.regRequestId}`]);
  }
}
