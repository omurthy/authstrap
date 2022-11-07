import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';
import { PrayingService } from '../_services/praying.service';

const API_URL : string = "https://api.collectapi.com";
const API_KEY : string = 'apikey 0pE8DpACgvNZUmtU6EKMCK:2hS2nvfgNNlplWwm4qNEzG';

//const TOKEN_HEADER_KEY = 'authorization';       // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService,private prayingService:PrayingService) { }
  public counter =0;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
   // authReq = req.clone({ headers: req.headers.set("authorization", API_KEY) });
    const token = this.token.getToken();
 //   headers: req.headers
   //     .set(TOKEN_HEADER_KEY, 'Bearer ' + token)
     //   .set("authorization", API_KEY) 
 if (token != null) {
      // for Spring Boot back-end
       authReq = req.clone({  
        setHeaders: {
          'authorization': authReq.urlWithParams.startsWith(API_URL) ? API_KEY : 'Bearer ' + token
      }
      });

      // for Node.js Express back-end
      //authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];