import { Injectable, inject } from '@angular/core';
import { Router, type ActivatedRouteSnapshot, type CanActivate,  type CanMatch, type Route, type RouterStateSnapshot, type UrlSegment } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AdminGuard implements CanMatch, CanActivate {

  private userService       = inject(UserService);
  private router            = inject(Router);


  private checkAuthStatus(): Observable<boolean> | boolean {
    if (!this.userService.currentUser) {
      return false;
    }
    return this.userService.checkIfAdmin(this.userService.currentUser!.id)
      .pipe(
        tap(isAdmin => {
          if (!isAdmin) {
            this.router.navigate(['/']);
          }
        })
      );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

}
