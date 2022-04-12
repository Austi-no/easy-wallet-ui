import { Component, OnInit } from '@angular/core';
import { SecurityServiceService } from './../../security/service/security-service.service';
import { SessionServiceService } from './../../security/service/session-service.service';
import { WalletService } from './../../components/wallet.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInUser: any = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
  userBalance: any;
  userLastDeposit: any;
  LastWithrawal: any;

  constructor(public walletService: WalletService) { }
  ngOnInit() {
    this.loggedInUser
    this.getCustomerBalance()
  }

  getCustomerBalance(): any {
    var userId = this.loggedInUser.id
    this.walletService.getAccountBalance(userId).subscribe((res: any) => {
      console.log(res);
      // this.LastWithrawal=res.data.
      this.userBalance = res.accountBalance
      this.userLastDeposit = res.lastDeposit

    })
  }

}
