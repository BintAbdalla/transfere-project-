import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BanqueService } from '../banque.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-banque',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.css'],
})
export class BanqueComponent {
  activeTab: string = 'Banque'; // Définir l'onglet actif
  successMessage: string | null = null;
  errorMessage: string | null = null;
  banqueForm: FormGroup;
  isMenuOpen: boolean = false;
  isMobile: boolean = window.innerWidth <= 768;
  balance: number = 12500.75; // Balance fictive
  isBalanceVisible: boolean = false; // Contrôle la visibilité du solde de la carte
  showBalance: boolean = false;
  // balance: number = 1000.50; // Exemple de solde
  owner: string = 'John Doe';


  // Menu items
  menuItems = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'Transactions', icon: 'fas fa-paper-plane' },
    { name: 'Crédit', icon: 'fas fa-credit-card' },
    { name: 'Banque', icon: 'fas fa-building' },
    { name: 'Paiement', icon: 'fas fa-piggy-bank' },
  ];

  transactions = [
    { id: 1, type: 'envoi', amount: 500, recipient: 'Marie Dupont', date: '2024-03-15' },
    { id: 2, type: 'reçu', amount: 1000, recipient: 'Jean Martin', date: '2024-03-14' },
    { id: 3, type: 'envoi', amount: 250, recipient: 'Sophie Bernard', date: '2024-03-13' },
  ];

  // Liste des banques
  banques = [
    { nom: 'Banque Nationale', code: 'BN' },
    { nom: 'Banque Populaire', code: 'BP' },
    { nom: 'Sencash Banque', code: 'SC' },
    { nom: 'Banque Internationale', code: 'BI' },
    { nom: 'Banque de l\'Afrique de l\'Ouest', code: 'BAO' },
    { nom: 'Banque Régionale de Solidarité', code: 'BRS' },
    { nom: 'Banque Atlantique', code: 'BA' },
    { nom: 'Banque Centrale', code: 'BC' },
    { nom: 'Banque Agricole', code: 'AGB' },
    { nom: 'Banque de Développement', code: 'BD' },
    { nom: 'Banque de l\'Habitat', code: 'BH' }
  ];

  constructor(
    private fb: FormBuilder,
    private banqueService: BanqueService,
    private router: Router
  ) {
    this.banqueForm = this.fb.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }


  toggleBalanceVisibility() {
    this.isBalanceVisible = !this.isBalanceVisible;
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
    if (tabName === 'Paiement') {
      this.router.navigate(['/paiement']);
    } else if (tabName === 'Transactions') {
      this.router.navigate(['/transactions']);
    } else if (tabName === 'Crédit') {
      this.router.navigate(['/credit']);
    } else if (tabName === 'Banque') {
      this.router.navigate(['/banque']);
    } else if (tabName === 'Dashboard') {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (this.banqueForm.invalid) {
      return;
    }

    const { fromAccount, toAccount, amount } = this.banqueForm.value;
    this.banqueService.effectuerVirement(fromAccount, toAccount, amount).subscribe({
      next: (isTransferSuccessful: boolean) => {
        if (isTransferSuccessful) {
          this.successMessage = 'Virement effectué avec succès';
          this.errorMessage = null;
          this.banqueForm.reset();
        } else {
          this.errorMessage = 'Erreur lors du virement';
          this.successMessage = null;
        }
      },
      error: () => {
        this.errorMessage = 'Erreur de communication avec le serveur';
        this.successMessage = null;
      },
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

 
  toggleBalance() {
    this.showBalance = !this.showBalance;
  }

  selectedBanque: any = null;

selectBanque(banque: any) {
  this.selectedBanque = banque;
}

cancelTransaction() {
  this.selectedBanque = null;
}

confirmTransaction() {
  // Ajoutez la logique de confirmation de transaction ici
  this.selectedBanque = null;
}

deselectBanque() {
  this.selectedBanque = null;
}



}
