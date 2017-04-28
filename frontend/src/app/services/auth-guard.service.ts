import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserAccessService} from "./user-access.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private accessService: UserAccessService, private router: Router) {
  }

  private checkLogin(url: string) {
    if (this.accessService.isAuthorized()) {
      return true;
    }

    this.accessService.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }

}
