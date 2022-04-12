import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {


  user: any = {};
  constructor() { }

  setUser(data: any): any {
    sessionStorage.setItem("loggedInUser", JSON.stringify(data));
  }

  getUser(): any {
    return sessionStorage.getItem("loggedInUser");

  }

  setUserRole(data: any):any {
    sessionStorage.setItem("userRoles", JSON.stringify(data));
  }

  getUserRole():any {
    return sessionStorage.getItem("userRoles");
  }
  //  auth gaurd implementation
  loggedIn(){
    return !!sessionStorage.getItem('token')

  }
  // getWalletAccount() {
  //   return (sessionStorage.getItem("userWallet"));
  // }
  // setWalletAccount(data: any) {
  //   sessionStorage.setItem("userWallet", JSON.stringify(data));
  // }

  logout(): any {
    // sessionStorage.removeItem("token");
    sessionStorage.clear()
  }

  setToken(token: any): any {
    sessionStorage.setItem("token", token);
  }

  getToken() {
    return sessionStorage.getItem("token");
  }
}
