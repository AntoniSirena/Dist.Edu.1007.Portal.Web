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
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor  {

  token: string;
  apiURL;

  constructor(private baseService: BaseService, private redirectService: RedirectService) {
    this.token = this.baseService.getUserToke();
    this.apiURL = environment.apiURL;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = this.baseService.getUserToke();
     
    let headers = new HttpHeaders();
     
    if(req.url.match("file/UploadFile")){
      headers = headers.append('Authorization', `${this.token}`);
      headers = headers.append('Access-Control-Allow-Origin', `${this.apiURL}`);
    }else{
      headers = headers.append('Authorization', `${this.token}`);
      headers = headers.append('content-type', 'application/json');
      headers = headers.append('Access-Control-Allow-Origin', `${this.apiURL}`);
    }

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
