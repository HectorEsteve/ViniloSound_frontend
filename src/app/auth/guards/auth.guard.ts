import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable }         from 'rxjs';
import { UserService }        from '../service/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {

  private userService       = inject(UserService);
  private router            = inject(Router);

  private checkAuthStatus(): boolean {
    if(!this.userService.currentUser){
      this.router.navigate(['/auth/login'])
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
