import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment';
import { LoaderService } from 'src/app/services/loader.service';
import { IconService } from 'src/app/services/icon-farm.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  initials: any = '';

  @Output() filterData: EventEmitter<any> = new EventEmitter();

  assetPreLoader;

  constructor(
    public iconService: IconService,
    public loaderService: LoaderService,
    private storageService: StorageService
  ) {
    this.assetPreLoader = environment.assetPreLoader;
  }

  ngOnInit() {
    this.getRandomColor();
    this.getUserData();
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    $('.initials-header').css('background-color', color);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterData.emit(filterValue);
  }

  getUserData() {
    const data = this.storageService.getData();
    this.initials = data.initials;
  }

  logout() {
    this.storageService.logout();
  }
}
