import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionServiceService } from './../service/session-service.service';



@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private service:SessionServiceService,private router: Router
  ) { }

  // Function to determine whether user is authorized to view route
  canActivate() {
    // Check if user is logged in
    if (this.service.loggedIn()) {
      this.router.navigate(['/']); // Return error, route to home
      return false; // Return false: user not allowed to view route
    } else {
      return true; // Return true: user is allowed to view route
    }
  }
}

