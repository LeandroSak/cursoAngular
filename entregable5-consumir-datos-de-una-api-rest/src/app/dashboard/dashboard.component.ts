import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

 constructor(private router: Router,  private authService: AuthService)
 {
 }
 logout(): void {
  this.authService.logout();
  this.router.navigate(['auth', 'login'], {})
}
}
