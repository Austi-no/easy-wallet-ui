import { Component, OnInit } from '@angular/core';
import { SecurityServiceService } from 'src/app/security/service/security-service.service';
import { SessionServiceService } from 'src/app/security/service/session-service.service';
import { WalletService } from './../../components/wallet.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  WalletTransaction:any=[];
  constructor( public service:SecurityServiceService, public session:SessionServiceService, private walletService:WalletService) { }
  loggedInUser:any= JSON.parse(sessionStorage.getItem("loggedInUser"))
 
  ngOnInit() {


  }


  }




