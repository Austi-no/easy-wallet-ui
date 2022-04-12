import { Component, OnInit } from '@angular/core';
import { WalletService } from './../wallet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buy-airtime-data',
  templateUrl: './buy-airtime-data.component.html',
  styleUrls: ['./buy-airtime-data.component.css']
})
export class BuyAirtimeDataComponent implements OnInit {
loggedInUser:any=JSON.parse(sessionStorage.getItem('loggedInUser') ||'{}');
amount:any;
transactionPin:any;
phoneNo:any;
  rechargeCard: any;
  showRechargeCard: boolean;
  userBalance: any ;
  userAccountNumber:any;


  constructor(private walletService:WalletService,private toastr:ToastrService) { }



  ngOnInit() {
    this.getCustomerBalance()
  }
  buyMtnAirtime(){
    var userId=this.loggedInUser.id
    var amount=this.amount
    var transactionPin=this.transactionPin
    var phoneNo=this.phoneNo
    var network="MTN"

   this.walletService.buyAirtime(userId, amount, transactionPin, phoneNo, network).subscribe(res=>{
     console.log(res);
     if(res.response=="Success"){
       this.toastr.success('',"Card Has been Generated...")
      this.rechargeCard=res.message
      this.showRechargeCard=true

     }else{
       this.toastr.error("",res.message)
     }
 
     
   });

  }

  buyGloAirtime(){
    var userId=this.loggedInUser.id
    var amount=this.amount
    var transactionPin=this.transactionPin
    var phoneNo=this.phoneNo
    var network="GLO"

   this.walletService.buyAirtime(userId, amount, transactionPin, phoneNo, network).subscribe(res=>{
     console.log(res);
     if(res.response=="Success"){
       this.toastr.success('',"Card Has been Generated...")
      this.rechargeCard=res.message
      this.showRechargeCard=true

     }else{
       this.toastr.error("",res.message)
     }
 
     
   })  
  }

  buyAirtelAirtime(){
    var userId=this.loggedInUser.id
    var amount=this.amount
    var transactionPin=this.transactionPin
    var phoneNo=this.phoneNo
    var network="AIRTEL"

   this.walletService.buyAirtime(userId, amount, transactionPin, phoneNo, network).subscribe(res=>{
     console.log(res);
     if(res.response=="Success"){
       this.toastr.success('',"Card Has been Generated...")
      this.rechargeCard=res.message
      this.showRechargeCard=true
    

     }else{
       this.toastr.error("",res.message)
     }
 
     
   })  
  }

  buy9mobileAirtime(){
    var userId=this.loggedInUser.id
    var amount=this.amount
    var transactionPin=this.transactionPin
    var phoneNo=this.phoneNo
    var network="9MOBILE"

   this.walletService.buyAirtime(userId, amount, transactionPin, phoneNo, network).subscribe(res=>{
     console.log(res);
     if(res.response=="Success"){
       this.toastr.success('',"Card Has been Generated...")
      this.rechargeCard=res.message
      this.showRechargeCard=true
    

     }else{
       this.toastr.error("",res.message)
     }
 
     
   })  

  }
  getCustomerBalance(): any {
    var userId = this.loggedInUser.id
    this.walletService.getAccountBalance(userId).subscribe((res: any) => {
      console.log(res);
      
      this.userBalance = res.data.accountBalance
      this.userAccountNumber= res.data.accountNumber

    })
  }

}
