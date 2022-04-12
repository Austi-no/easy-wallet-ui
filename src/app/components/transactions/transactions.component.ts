import { Component, OnInit } from '@angular/core';
import { WalletService } from './../wallet.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  userBalance: any ;
  userAccountNumber:any;
  p: number = 1;
  WalletTransaction: any = [];
 

  loggedInUser: any = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
  constructor(public walletService:WalletService) { }

  ngOnInit(){
 
    this.getCustomerBalance()
    this.getAllWithdrawalLogs()
  }


  getCustomerBalance(): any {
    var userId = this.loggedInUser.id
    this.walletService.getAccountBalance(userId).subscribe((res: any) => {
      console.log(res);
      
      this.userBalance = res.data.accountBalance
      this.userAccountNumber= res.data.accountNumber

    })
  }


  getAllWithdrawalLogs(){
    this.walletService.getAllLogs().subscribe((res:any)=>{
      console.log(res);
        this.WalletTransaction = res.filter((x: any) => x.userId.id === this.loggedInUser.id);
        console.log(this.WalletTransaction);
    })
    }


}
