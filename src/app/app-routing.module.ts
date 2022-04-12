import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { AuthGuard } from './security/helper/auth.guard';
import { NotAuthGuard } from './security/helper/notAuth.guard';
import { LoginComponent } from './security/login/login.component';
import { SignUpComponent } from './security/sign-up/sign-up.component';

const routes: Routes = [


  { path: 'login', component: LoginComponent,canActivate:[NotAuthGuard] },
  
  {path:'sign-up', component:SignUpComponent,canActivate:[NotAuthGuard]},

  {path:'', component:HomeComponent, 

  children:[
  {
    path: '', 
    loadChildren: () => import('./layout/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AuthGuard]
  },
  {
    path: 'deposit', 
    loadChildren: () => import('./components/deposit/deposit.module').then(m => m.DepositModule) ,canActivate:[AuthGuard]
  },
  {
    path: 'withdrawal', 
    loadChildren: () => import('./components/withdrawal/withdrawal.module').then(m => m.WithdrawalModule),canActivate:[AuthGuard]
  },
  {
    path: 'transfer', 
    loadChildren: () => import('./components/transfer/transfer.module').then(m => m.TransferModule),canActivate:[AuthGuard]
  },
  {
    path: 'transactions', 
    loadChildren: () => import('./components/transactions/transactions.module').then(m => m.TransactionsModule),canActivate:[AuthGuard]
  },
  {
    path: 'buyAirtime', 
    loadChildren: () => import('./components/buy-airtime-data/buy-airtime-data.module').then(m => m.BuyAirtimeDataModule),canActivate:[AuthGuard]
  },
  {
    path: 'user-details', 
    loadChildren: () => import('./components/Users/user-details/user-details.module').then(m => m.UserDetailsModule),canActivate:[AuthGuard]
  },
  {
    path: 'edit-user', 
    loadChildren: () => import('./components/Users/edit-user/edit-user.module').then(m => m.EditUserModule),canActivate:[AuthGuard]
  },
]},
{path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
