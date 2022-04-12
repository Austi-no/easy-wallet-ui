import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityServiceService } from 'src/app/security/service/security-service.service';
import { SessionServiceService } from './../../security/service/session-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedInUser:any=JSON.parse(sessionStorage.getItem("loggedInUser"));
  constructor(private router: Router, public service:SecurityServiceService, public session:SessionServiceService) { }

  ngOnInit(): void {
  }
  toggle() {
    // console.log(e);
    var wrapper = document.querySelector("body");
    wrapper.classList.toggle("sb-sidenav-toggled");
  }

  gotoLogin() {
    this.router.navigate(['login'])
  }
  gotoSignup() {
    this.router.navigate(['sign-up'])
  }

  logout(){
    this.session.logout()
    this.router.navigate(['login'])
  }

}
