import { Component, OnInit } from '@angular/core';
import { WalletService } from './../wallet.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {
  public loading = false;
  constructor(private walletService: WalletService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  WalletTransaction: any = [];
  loggedInUser: any = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
  amountToWithdraw: any;
  transactionPin: any;
  paymentMethod: any;
  userBalance: any;
  userAccountNumber: any;
  p: number = 1;


  ngOnInit() {

    this.getCustomerBalance()
    this.getAllDepositLogs()
  }

  withdrawal() {
    this.loading = true;
    var paymentMethod = this.paymentMethod;
    var amountToWithdraw = this.amountToWithdraw;
    var transactionPin = this.transactionPin
    var userId = this.loggedInUser.id
    console.log(`PaymentMethod= ${paymentMethod} \nAmount= ${amountToWithdraw} \npin= ${transactionPin} \nUserId= ${userId}`);
    this.walletService.withdraw(paymentMethod, amountToWithdraw, transactionPin, userId).subscribe((res: any) => {
      this.spinner.show();

      if (res.success == true) {

        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.toastr.success("", `You Withdraw ${this.amountToWithdraw} from your account`)
        }, 2000);

      } else {


        this.spinner.hide();
        this.toastr.error('', res.message)


      }
      console.log(res);
    })
  }

  getCustomerBalance(): any {
    var userId = this.loggedInUser.id
    this.walletService.getAccountBalance(userId).subscribe((res: any) => {
      console.log(res);

      this.userBalance = res.accountBalance
      this.userAccountNumber = res.accountNumber

    })
  }

  getAllDepositLogs() {
    this.walletService.getAllLogs().subscribe((res: any) => {
      console.log(res);
      this.WalletTransaction = res.filter((x: any) => x.userId.id === this.loggedInUser.id && x.service === "Withdrawal");
      console.log(this.WalletTransaction);
    })
  }


}
