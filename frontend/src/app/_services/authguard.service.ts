import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private loginComponent:TokenStorageService,private router:Router,) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let logged = window.sessionStorage.getItem(TOKEN_KEY);
    if(logged!==null){
      return true;
    }
    this.router.navigate(['home']);
    throw new Error('Method not implemented.');
  }
}
