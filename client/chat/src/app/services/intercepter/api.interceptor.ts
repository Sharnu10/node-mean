import {
  HttpErrorResponse,
  HttpHeaders,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { catchError } from 'rxjs';
import { ToasterService } from '../toaster.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService);
  const toasterService = inject(ToasterService);

  let authToken = token.getUserData().token;

  console.log('authToken ', authToken);

  const authReq = req.clone({
    headers: new HttpHeaders({
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `${authToken}` } : {}),
    }),
  });

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err) {
        switch (err.status) {
          case 401:
            toasterService.error(err);
            console.log('[401 error] ', err.status, ' [err] ', err);
            break;
          case 404:
            toasterService.error(err);
            console.log('[404 error] ', err.status, ' [err] ', err);
            break;
          case 500:
            toasterService.error(err);
            console.log('[500 error] ', err.status, ' [err] ', err);
            break;
          default:
            toasterService.error(err);
            break;
        }
        throw err;
      }
      throw err;
    })
  );
};
