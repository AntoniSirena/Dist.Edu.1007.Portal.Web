import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { BaseService } from '../../services/base/base.service';
import { RedirectService } from '../../services/redirect/redirect.service';
import { Ilogin } from '../../interfaces/Ilogin/ilogin';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor  {

  token: string;

  constructor(private baseService: BaseService, private redirectService: RedirectService) {
    this.token = this.baseService.getUserToke();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = this.baseService.getUserToke();

    const headers = new HttpHeaders({
    'Authorization': `${this.token}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:61048/',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });

    const reqclone = req.clone({
      headers
    });

    return next.handle(reqclone).pipe(   
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if(err.status === 401){
            this.redirectService.login();
          }
          if(err.status === 404){
            this.redirectService.error404();
          }
          if(err.status === 500){
            this.redirectService.error500();
          }
          if(err.status === 409){
            let userName = JSON.parse(localStorage.getItem("userName"));
            let password = JSON.parse(localStorage.getItem("password"));

            const login: Ilogin = {
              UserName: userName,
              Password: password,
              EmailAddress: null
            };

            localStorage.clear();
            this.token = "";
            
            this.redirectService.SubmitLogin(login, true);
          }
        }
      })

    );
  }
}
