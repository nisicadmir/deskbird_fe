import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export function generalInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        // Unauthorized - redirect to login
        router.navigate(["/sign-in"]);
      } else if (error.status === 404) {
        // Not Found - redirect to 404 page
        // router.navigate(['/not-found']);
      }
      return throwError(() => error);
    })
  );
}
