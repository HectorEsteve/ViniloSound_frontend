import { CanMatch, CanActivate, Router, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable,}         from 'rxjs';
import { UserService }        from '../service/user.service';


@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  private userService       = inject(UserService);
  private router            = inject(Router);

  private checkAuthStatus(): boolean {
    if(this.userService.currentUser){
      this.router.navigate(['./'])
      return false
    }else{
      return true;
    }
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

}
