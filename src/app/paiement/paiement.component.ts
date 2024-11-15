import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Type pour les services
type ServiceType = 'facture' | 'restauration';

@Component({
  selector: 'app-paiement',
  standalone: true,
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css'],
  imports: [CommonModule, FormsModule]
})
export class PaiementComponent {
  formData = {
    meterNumber: '',
    restaurantId: '',
    orderNumber: '',
    amount: 0,
    phoneNumber: '',
    reference: ''  // Ajouter la propriété 'reference'
  };

  menuItems = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'Transactions', icon: 'fas fa-paper-plane' },
    { name: 'Crédit', icon: 'fas fa-credit-card' },
    { name: 'Banque', icon: 'fas fa-building' },
    { name: 'Paiement', icon: 'fas fa-piggy-bank' },
  ];

  activeTab: string = 'Dashboard';
  selectedServiceType: ServiceType | null = null;
  selectedService: any = null;

  services: { [key in ServiceType]: { name: string; details: string[] }[] } = {
    facture: [
      { name: 'Sen Eau', details: ['Référence', 'Montant'] },
      { name: 'Woyofal', details: ['Référence', 'Montant'] },
      { name: 'CampusEN', details: ['Référence', 'Montant'] }
    ],
    restauration: [
      { name: 'Restaurant Le Ngor', details: ['Montant'] },
      { name: 'Restaurant La Kermesse', details: ['Montant'] },
      { name: 'Restaurant Le Dakar', details: ['Montant'] },
      { name: 'Restaurant Les Cocotiers', details: ['Montant'] }
    ]
  };
  

  constructor(private router: Router) {}

  selectServiceType(type: ServiceType) {
    this.selectedServiceType = type;
    this.selectedService = null; // Réinitialiser le service sélectionné
  }

  getServices() {
    return this.selectedServiceType ? this.services[this.selectedServiceType] : [];
  }

  selectService(service: any) {
    this.selectedService = service;
  }

  handleSubmit() {
    console.log('Payment submitted:', this.formData);
    // Logique pour traiter le paiement
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      meterNumber: '',
      restaurantId: '',
      orderNumber: '',
      amount: 0,
      phoneNumber: '',
      reference: ''  // Réinitialiser la propriété 'reference'
    };
    this.selectedService = null;
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
}
