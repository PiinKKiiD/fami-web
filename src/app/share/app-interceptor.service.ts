import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AppInterceptorService implements HttpInterceptor{
  constructor(){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({'Authentication' : 'fami auth'});
    const clone  = req.clone({headers: headers})
    return next.handle(req).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
    console.log('error occurred');
    return throwError(error);
  }

}
