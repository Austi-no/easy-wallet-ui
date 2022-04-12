import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WalletService } from './../wallet.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  loggedInUser: any = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
  hideForm: boolean;
  accountNo: any
  recipient: any = {};
  currentTime = new Date();
  amountToTransfer: any;
  transactionPin: any;
  userBalance: any;
  userAccountNumber: any;
  constructor(private walletService: WalletService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getCustomerBalance()
  }


  openTransferAccount(): any {
    this.walletService.getUserAccountNumber(this.accountNo).subscribe(res => {
      console.log(res);
      var account = res?.data.walletAccountId?.accountNumber
      console.log(account);
      var userAccount = this.loggedInUser?.walletAccountId?.accountNumber
      console.log(userAccount);
      if (res.success == true && account != userAccount) {
        this.hideForm = true;
        this.toastr.success("", `${this.accountNo} exists`)
        this.recipient = res.data
      } else if (res.success == true && account === userAccount) {
        this.toastr.error('', 'You can make transfer to the same account number!')
      } else {
        this.toastr.error('Ops', `No user found with account no ${this.accountNo}`)
      }
    })
  }

  transfer() {
    var userId = this.loggedInUser.id
    var recipientUserId = this.recipient.id;
    var recipientAcctNo = this.recipient?.walletAccountId?.accountNumber;
    var amountToTransfer = this.amountToTransfer
    var transactionPin = this.transactionPin

    this.walletService.transfer(userId, recipientUserId, recipientAcctNo, amountToTransfer, transactionPin).subscribe(res => {
      console.log(res);

      this.spinner.show();
      if (res.message == "Success") {

        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.toastr.success("", `You Transferred ${this.amountToTransfer} to ${this.recipient.username}`)
        }, 3000);

      }

      else {
        this.spinner.hide();
        this.toastr.error('', res.message)
      }

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

}
