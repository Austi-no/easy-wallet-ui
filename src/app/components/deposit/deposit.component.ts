import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WalletService } from './../wallet.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  loggedInUser: any = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
  paymentMethod: any
  depositAmount: any
  pin: any
  WalletTransaction: any = [];
  amount: any;
  userBalance: any;
  userAccountNumber: any;
  p: number = 1;

  constructor(private walletService: WalletService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getCustomerBalance()
    this.getAllWithdrawalLogs()
    //  this.spinner.show();
  }

  makeDeposit() {
    var paymentMethod = this.paymentMethod
    var depositAmount = this.depositAmount
    var transactionPin = this.pin
    var userId = this.loggedInUser.id
    console.log(`PaymentMethod= ${paymentMethod} \n Amount= ${depositAmount} \n pin= ${transactionPin} \n UserId= ${userId}`);

    this.walletService.makeDeposit(paymentMethod, depositAmount, transactionPin, userId).subscribe((res: any) => {
      console.log(res);

      this.spinner.show();
      if (res.success == true) {

        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.toastr.success("", `You Deposited ${this.depositAmount} to your Account`)
        }, 3000);

      } else {
        this.spinner.hide();
        this.toastr.error('', res.message)
      }
    })
  }

  getCustomerBalance(): any {
    var userId = this.loggedInUser.id
    this.walletService.getAccountBalance(userId).subscribe((res: any) => {
      this.userBalance = res.accountBalance
      this.userAccountNumber = res.accountNumber

    })
  }
  getAllWithdrawalLogs() {
    this.walletService.getAllLogs().subscribe((res: any) => {
      console.log(res);

      this.WalletTransaction = res.filter((x: any) => x.userId.id === this.loggedInUser.id && x.service === "Deposit");
      console.log(this.WalletTransaction);
    })
  }
}

