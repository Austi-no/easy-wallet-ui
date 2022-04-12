import { Injectable } from '@angular/core';
import { CanActivate, 
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SessionServiceService } from './../service/session-service.service';




@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  redirectUrl;

constructor(private service:SessionServiceService,private router:Router ){}




canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
  if(this.service.loggedIn()){
    return true;
  }
  else{
    this.redirectUrl=state.url;
     this.router.navigate(['/login'])
    return false;
  }

}
  
}


