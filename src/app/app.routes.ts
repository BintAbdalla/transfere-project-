import { Routes } from '@angular/router';
import { LoginTransferComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transaction/transaction.component'
import { VerificationComponent } from './verification/verification.component'

// Routes configuration for the applicationi

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginTransferComponent },
  { path: 'home', component: HomeComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path:'verification', component:VerificationComponent}
];
