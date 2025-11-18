import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    // Not logged in → go to choose user type
    if (!token) {
      this.router.navigate(['/choose-user-type']);
      return false;
    }

    // Role-based route check
    const requiredRole = route.data['role'];
    if (requiredRole && userRole !== requiredRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}