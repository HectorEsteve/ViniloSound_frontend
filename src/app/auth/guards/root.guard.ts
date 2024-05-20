import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, type CanActivate, type CanActivateFn, type CanMatch } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class RootGuard implements CanMatch, CanActivate {

  private userService       = inject(UserService);
  private router            = inject(Router);


  private checkAuthStatus(): Observable<boolean> | boolean {
    if (!this.userService.currentUser) {
      return false;
    }
    return this.userService.checkIfRoot(this.userService.currentUser!.id)
      .pipe(
        tap(isRoot => {
          if (!isRoot) {
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
