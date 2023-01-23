import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry, map } from 'rxjs/operators';

import { AuthenticationDialogComponent } from '../Dialogs/authentication-dialog/authentication-dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from './toast.service';

import { LoaderService } from './loader.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    private api: ApiService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Remove for websockets and asserts
    if (req.responseType !== 'text') {
      this.loaderService.isLoading.next(true);
    }
    return next.handle(req).pipe(
      map((e: HttpEvent<any>) => {
        if (e instanceof HttpResponse && typeof e.body !== 'string') {
          if (e.body.hostHeaderInfo) {
            let resCode = e.body.hostHeaderInfo.responseCode;
            if (resCode === 'A09' || resCode === 'A13' || resCode === 'E401') {
              this.openAuthenticationDialog();
            }
          } else {
            // e.body.responseCode;
          }
        }
        return e;
      }),
      finalize(() => {
        if (req.responseType !== 'text') {
          this.loaderService.isLoading.next(false);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = error;
        this.loaderService.isLoading.next(false);
        console.log(error);
        if (req.responseType !== 'text') {
          this.toast.showToast(
            'There was an error, please try again.',
            'error-toast'
          );
        }
        return throwError(errorMessage);
      })
    );
  }

  openAuthenticationDialog() {
    const dialogRef  = this.dialog.open(AuthenticationDialogComponent, {
      width: '450px',
      disableClose: true,
    });
    dialogRef.componentInstance.onSuccess.subscribe((data:any) => {
      if (data === '000') {
      }
    });
  }
}
