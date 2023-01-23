import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { StorageService } from "src/app/services/storage.service";
import { IconService } from "src/app/services/icon-farm.service";
import { SideBarData } from "src/app/interface/types";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  src = "";
  userRole: any;
  @Input("list") list: any = [];
  @Input("view") view: string = this.list[0]?.children[0].name ?? "New";

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Output() tableView: EventEmitter<any> = new EventEmitter();

  constructor(
    public iconService: IconService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    // this.iconService;
  }

  show(e: string) {
    this.view = e;
    this.tableView.emit(e);
  }

  // imageLink = 'Active'
}
