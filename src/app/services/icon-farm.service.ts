import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  assetBASE = environment.assetPreLoader;
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) { }
  
  generateIcon(icon:string){
    this.iconRegistry.addSvgIcon(
      icon,
      this.sanitizer.bypassSecurityTrustResourceUrl(
        this.assetBASE + `/assets/icons/${icon}.svg`
      )
      );
      return icon
  }
}
