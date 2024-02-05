import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    headers: new HttpHeaders({
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
    }),
  });

  return next(authReq);
};
