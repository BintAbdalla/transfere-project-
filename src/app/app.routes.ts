import { Routes } from '@angular/router';
import { LoginTransferComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transaction/transaction.component'
import { VerificationComponent } from './verification/verification.component'
import {CreditComponent} from './credit/credit.component'
import {PaiementComponent} from './paiement/paiement.component'
import { BanqueComponent } from './banque/banque.component';


// Routes configuration for the applicationi

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginTransferComponent },
  { path: 'home', component: HomeComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path:'verification', component:VerificationComponent},
  { path: 'credit', component: CreditComponent},
  { path: 'paiement', component: PaiementComponent},
  { path:'banque', component:BanqueComponent},
  { path: '**', redirectTo: '/login' },
 
];

