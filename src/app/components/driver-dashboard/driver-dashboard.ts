import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-driver-dashboard',
  imports: [],
  templateUrl: './driver-dashboard.html',
  styles: ``,
})
export class DriverDashboard {
    constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

}
