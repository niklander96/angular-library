import {inject, Injectable} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private router: Router = inject(Router)
  private accountService: AccountService = inject(AccountService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userSubjectFromService.value;
    if (user) {
      return true;
    }

    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
