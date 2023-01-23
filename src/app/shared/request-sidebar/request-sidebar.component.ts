import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-request-sidebar',
  templateUrl: './request-sidebar.component.html',
  styleUrls: ['./request-sidebar.component.scss']
})
export class RequestSidebarComponent implements OnInit {
  constructor(private storageService: StorageService) { }
 
  @Input() account: any;
  
  
  ngOnInit(): void {
  }
}
