import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccueilService } from '../accueil.service';
import { User } from '../../models/user.model';

interface Transaction {
  id: number;
  sender_nom: string;
  sender_prenom: string;
  receiver_nom: string;
  receiver_prenom: string;
  montant_envoye: number;
  montant_recus: number;
  type_transaction: string;
  receiver: User;
  sender: User;
  telephone: User;
  receiver_id: number;
  statut: string;
  createdAt: string;
}

@Component({
  selector: 'app-home',
  templateUrl: '../home/home.component.html',
  styles: [
    `
      .min-h-screen {
        min-height: 100vh;
      }
    `,
  ],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class HomeComponent implements OnInit {
  transactionsSent: Transaction[] = [];
  transactionsReceived: Transaction[] = [];
  walletSolde: number = 0;
  errorMessage: string | null = null;
  isMenuOpen: boolean = false;
  isMobile: boolean = window.innerWidth <= 768;
  selectedTransaction: Transaction | null = null; // Pour stocker les détails de la transaction sélectionnée
  currentUser: User | null = null; // Définir currentUser comme étant de type User ou null
  transaction: Transaction | null = null; // Initialisation correcte de la transaction
  allTransactions: any[] = [];

  menuItems = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'Transactions', icon: 'fas fa-paper-plane' },
    { name: 'Crédit', icon: 'fas fa-credit-card' },
    { name: 'Banque', icon: 'fas fa-building' },
    { name: 'Paiement', icon: 'fas fa-piggy-bank' },
  ];

  activeTab: string = 'Dashboard';

  constructor(private router: Router, private accueilService: AccueilService) {}

  ngOnInit() {
    this.FetchData(); // Récupérer les données
    this.checkIfMobile(); // Vérifier si on est sur mobile
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null; // Initialiser currentUser si trouvé dans localStorage

    // Vérification de l'objet transaction
    if (this.transaction) {
      console.log('transaction.receiver_id:', this.transaction.receiver_id);
    } else {
      console.log('Transaction is undefined');
    }

    // Vérification de currentUser
    if (this.currentUser) {
      console.log('currentUser.id:', this.currentUser.id);
    } else {
      console.log('currentUser is undefined');
    }
    this.allTransactions = [
      ...this.transactionsSent,
      ...this.transactionsReceived,
    ];
  }

  FetchData() {
    this.accueilService.getAccueil().subscribe({
      next: (data) => {
        console.log(data);

        // Récupérer et trier les transactions envoyées et reçues
        // this.transactionsSent = data.data.user.transactionsSent.sort(
        //   (a: Transaction, b: Transaction) =>
        //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        // );
        // // console.log();

        // this.transactionsReceived = data.data.user.transactionsReceived.sort(
        //   (a: Transaction, b: Transaction) =>
        //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        // );

        // // Fusionner les deux types de transactions
        this.allTransactions = [
          ...data.data.transactionsSent,
          ...data.data.transactionsReceived,
        ].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        console.log('transaction : ' + this.allTransactions);

        this.walletSolde = data.data.wallet.solde;
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        this.errorMessage =
          "Une erreur de serveur s'est produite. Veuillez réessayer.";
      },
    });
  }

  // Changer l'onglet actif
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

  @HostListener('window:resize', ['$event'])
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  showTransactionDetails(transaction: Transaction) {
    this.selectedTransaction = transaction; // Stocker la transaction sélectionnée
  }

  closeModal() {
    this.selectedTransaction = null; // Fermer le modal
  }
}
