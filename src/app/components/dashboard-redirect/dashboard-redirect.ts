import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-redirect',
  templateUrl: './dashboard-redirect.html',
  styleUrls: ['./dashboard-redirect.css']
})
export class DashboardRedirectComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    setTimeout(() => { // small delay to show spinner
      if (!token) {
        this.router.navigate(['/choose-user-type']);
        return;
      }

      switch(role) {
        case 'Driver':
          this.router.navigate(['/driver-dashboard']);
          break;
        case 'Rider':
          this.router.navigate(['/rider-dashboard']);
          break;
        case 'Admin':
          this.router.navigate(['/admin-dashboard']);
          break;
        default:
          this.router.navigate(['/choose-user-type']);
      }
    }, 500); // half-second delay for smooth spinner display
  }
}
