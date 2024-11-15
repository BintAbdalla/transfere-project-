import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { TransactionsService } from '../transaction.service';
import { CreditService } from '../credit.service';

interface Contact {
  id: number;
  nom: string;
  telephone: string;
  operator: string;
}

interface Operator {
  id: string;
  name: string;
}

@Component({
  selector: 'credit-',
  templateUrl: '../credit/credit.component.html',
  styleUrls: ['../credit/credit.component.html'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
})
export class CreditComponent implements OnInit {
  phoneNumber = '';
  montant: number | null = null; // Montant saisi par l'utilisateur
  selectedOperator: string | null = null;
  showSuccess = false;
  isDialogOpen = false;
  activeTab: string = 'Dashboard';
  isMenuOpen: boolean = false;
  isMobile: boolean = window.innerWidth <= 768;
  nom: string ="";
  formData = {
    phoneNumber: '',
    operator: '',
    amount: 0
  };

  contacts: Contact[] = [];
  menuItems = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'Transactions', icon: 'fas fa-paper-plane' },
    { name: 'Crédit', icon: 'fas fa-credit-card' },
    { name: 'Banque', icon: 'fas fa-building' },
    { name: 'Paiement', icon: 'fas fa-piggy-bank' },
  ];

  operators: Operator[] = [
    { id: 'orange', name: 'Orange' },
    { id: 'free', name: 'Free' },
    { id: 'sfr', name: 'SFR' },
  ];

  constructor(private router: Router, private transactionservice: TransactionsService, private creditservice: CreditService) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.transactionservice.getContact().subscribe({
      next: (response) => {
        this.contacts = response.data; // Adaptez ceci selon la structure de votre réponse
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des contacts:', error);
      },
    });
  }

  handleSubmit() {
    if (this.phoneNumber && this.montant && this.selectedOperator  ) {
      const credentials = {
        nom_contact: this.nom, // Remplacez par le nom du contact, si nécessaire
        telephone_contact: this.phoneNumber,
        montant: Number(this.montant) // Assurez-vous que c'est un nombre

      };
      console.log(credentials);

      this.creditservice.credit(credentials).subscribe({
        next: (response) => {
          console.log(response);
          
          console.log('Réponse de l\'API:', response);
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 3000);
        },
        error: (error) => {
          console.error('Erreur lors de l\'achat de crédit:', error);
        },
      });
    }
  }

  formatPhoneNumber(value: string | null) {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/);
    return match ? `${match[1]} ${match[2]} ${match[3]} ${match[4]}` : value;
  }

  selectFavorite(contact: Contact) {
    this.phoneNumber = contact.telephone;
    this.selectedOperator = contact.operator;
    this.nom = contact.nom;
  }

  onPhoneNumberInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.phoneNumber = this.formatPhoneNumber(inputElement ? inputElement.value : '');
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

  @HostListener('window:resize', ['$event'])
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  resetForm() {
    this.formData = {
      phoneNumber: '',
      operator: '',
      amount: 0
    };
  }
}
