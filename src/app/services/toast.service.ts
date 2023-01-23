import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _snackBar: MatSnackBar) { }

  showToast(message: string,type: 'success-toast' | 'error-toast' | 'neutral-toast') {

    this._snackBar.open(message, 'X', {duration:3000,verticalPosition: 'top',panelClass: [type]});

  }
}
