import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,ReactiveFormsModule,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Favorite {
  id: number;
  name: string;
  number: string;
}
@Component({
  selector: 'app-transactions',
  template: `
  <div class="min-h-screen bg-gray-50 flex">
  <!-- Sidebar -->
  <nav class="fixed left-0 top-0 h-full w-72 bg-white/90 backdrop-blur-sm shadow-xl border-r border-gray-100">
    <div class="p-8">
      <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#d6a3c5] to-[#a75c92]">
        Sencash
      </h1>
    </div>
    <div class="mt-8 px-4">
      <button
        *ngFor="let item of menuItems"
        (click)="setActiveTab(item.name)"
        class="w-full flex items-center px-6 py-4 rounded-xl mb-2 transition-all duration-300"
        [ngClass]="{
          'bg-gradient-to-r from-[#d6a3c5] to-[#a75c92] text-white shadow-lg transform scale-105': activeTab === item.name,
          'text-gray-600 hover:bg-[#d6a3c5]/10 hover:text-[#a75c92]': activeTab !== item.name
        }"
      >
        <i [ngClass]="item.icon + ' mr-4 text-lg'"></i>
        <span class="font-medium">{{ item.name }}</span>
      </button>
    </div>
  </nav>

  <!-- Main Content -->
  <div class="flex-grow ml-72 p-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div class="relative w-96">
        <input
          type="text"
          placeholder="Rechercher une transaction..."
          class="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#d1c6db] focus:border-[#d6a3c5] focus:outline-none focus:ring-2 focus:ring-[#d6a3c5]/50 transition-all duration-300 bg-[#f9f6fa]"
        />
        <i class="fas fa-search absolute left-4 top-3.5 text-gray-400"></i>
      </div>

      <div class="flex items-center space-x-6">
        <button class="relative p-3 rounded-xl hover:bg-[#d6a3c5]/10 transition-colors duration-300">
          <i class="fas fa-bell text-gray-600 text-xl"></i>
          <span class="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div class="h-12 w-12 rounded-xl bg-gradient-to-r from-[#d6a3c5] to-[#a75c92] flex items-center justify-center shadow-lg">
          <i class="fas fa-user text-white text-xl"></i>
        </div>
      </div>
    </div>

    <div class="flex space-x-8"> <!-- Utiliser flex pour disposer les sections côte à côte -->
  <!-- Transfer Money Section -->
  <div class="bg-white rounded-2xl shadow-lg p-8 mb-8 transition-all duration-300 border border-gray-200 w-full md:w-1/2">
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold text-gray-800">Envoyer de l'Argent</h2>
    <button
      (click)="toggleNewRecipientForm()"
      class="text-2xl font-bold text-[#a75c92] hover:text-[#d6a3c5] focus:outline-none"
    >
      +
    </button>
  </div>

  <!-- Form steps -->
  <form [formGroup]="transferForm" (ngSubmit)="onSubmit()">
    <!-- Step 1: Recipient Selection -->
    <div *ngIf="!showNewRecipientForm && !showAmountFields">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="recipient">Destinataire</label>
      <input
        id="recipient"
        type="text"
        formControlName="recipient"
        placeholder="Sélectionnez un destinataire ou entrez un numéro"
        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#d6a3c5] focus:ring-2 focus:ring-[#d6a3c5]/50 transition-all duration-200"
      />
    </div>

    <!-- Step 2: New Recipient Fields -->
    <div *ngIf="showNewRecipientForm">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="newPhone">Numéro de téléphone</label>
      <input
        id="newPhone"
        type="text"
        formControlName="newPhone"
        placeholder="Entrez le numéro de téléphone"
        class="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:border-[#d6a3c5] focus:ring-2 focus:ring-[#d6a3c5]/50 transition-all duration-200"
      />

      <label class="block text-sm font-medium text-gray-700 mb-2" for="firstName">Nom</label>
      <input
        id="firstName"
        type="text"
        formControlName="firstName"
        placeholder="Entrez le nom"
        class="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:border-[#d6a3c5] focus:ring-2 focus:ring-[#d6a3c5]/50 transition-all duration-200"
      />

      <label class="block text-sm font-medium text-gray-700 mb-2" for="lastName">Prénom</label>
      <input
        id="lastName"
        type="text"
        formControlName="lastName"
        placeholder="Entrez le prénom"
        class="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:border-[#d6a3c5] focus:ring-2 focus:ring-[#d6a3c5]/50 transition-all duration-200"
      />

      <button
        type="button"
        (click)="proceedToAmountFields()"
        class="w-full py-4 mt-4 bg-gradient-to-r from-[#d6a3c5] to-[#a75c92] text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
      >
        Suivant
      </button>
    </div>

    <!-- Step 3: Amount Fields -->
    <div *ngIf="showAmountFields">
      <label class="block text-sm font-medium text-gray-700 mb-2" for="amount">Montant Envoyé</label>
      <input
        id="amount"
        type="number"
        formControlName="amount"
        placeholder="0 FCFA"
        class="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:border-[#d6a3c5] focus:ring-2 focus:ring-[#d6a3c5]/50 transition-all duration-200"
      />

      <label class="block text-sm font-medium text-gray-700 mb-4">Montant Reçu</label>
      <input
        type="text"
        [value]="getReceivedAmount()"
        disabled
        class="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-600"
      />

      <button
        type="submit"
        class="w-full py-4 mt-4 bg-gradient-to-r from-[#d6a3c5] to-[#a75c92] text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
      >
        Envoyer
      </button>
    </div>
  </form>
</div>


  <!-- Favorites Section -->
  <div class="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 border border-gray-200 w-full md:w-1/2">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Favoris</h2>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div *ngFor="let favorite of favorites" (click)="selectFavorite(favorite)" class="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-100">
        <div class="flex items-center space-x-4">
          <div class="h-10 w-10 rounded-full bg-gradient-to-r from-[#d6a3c5] to-[#a75c92] flex items-center justify-center">
            <span class="text-white font-medium">{{ favorite.name[0] }}</span>
          </div>
          <div>
            <p class="font-medium text-gray-800">{{ favorite.name }}</p>
            <p class="text-sm text-gray-500">{{ favorite.number }}</p>
          </div>
        </div>
        <span class="w-5 h-5 text-purple-600">💸</span>
      </div>
    </div>
  </div>
</div>


  </div>
</div>

   
  `,
    styles: [`
      /* Ajoutez vos styles personnalisés ici si nécessaire */
    `],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule]
})
export class TransactionsComponent {
  transferForm: FormGroup;
  showNewRecipientForm = false;
  showAmountFields = false;
  activeTab: string = '';
  favorites: Favorite[] = [
    { id: 1, name: "Fatou Diop", number: "771234567" },
    { id: 2, name: "Mamadou Sall", number: "768901234" },
    { id: 3, name: "Aissatou Ba", number: "773456789" },
    { id: 4, name: "Omar Sy", number: "765432109" },
    { id: 5, name: "Rama Fall", number: "769876543" },
    { id: 6, name: "Ibou Diallo", number: "764567890" },
    { id: 7, name: "Sokhna Ndiaye", number: "776789012" },
  ];

  menuItems = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'Transactions', icon: 'fas fa-paper-plane' },
    { name: 'Crédit', icon: 'fas fa-credit-card' },
    { name: 'Banque', icon: 'fas fa-building' },
    { name: 'Paiement', icon: 'fas fa-piggy-bank' }
  ];

  constructor(private fb: FormBuilder) {
    this.transferForm = this.fb.group({
      recipient: [''],
      newPhone: [''],
      firstName: [''],
      lastName: [''],
      amount: ['']
    });
  }

  onRecipientChange() {
    const recipientValue = this.transferForm.get('recipient')?.value;
    this.showAmountFields = recipientValue !== '';
  }

  selectFavorite(favorite: Favorite) {
    this.transferForm.patchValue({
      recipient: `${favorite.name} - ${favorite.number}`
    });
    this.showAmountFields = true;
  }

  toggleNewRecipientForm() {
    this.showNewRecipientForm = !this.showNewRecipientForm;
    this.showAmountFields = false;
    this.transferForm.reset();
  }

  proceedToAmountFields() {
    const newPhone = this.transferForm.get('newPhone')?.value;
    const firstName = this.transferForm.get('firstName')?.value;
    const lastName = this.transferForm.get('lastName')?.value;
    const fullRecipient = `${firstName} ${lastName} (${newPhone})`;

    this.transferForm.patchValue({ recipient: fullRecipient });
    this.showAmountFields = true;
  }

  getReceivedAmount(): string {
    const amount = this.transferForm.get('amount')?.value;
    return amount ? `${Number(amount) - (Number(amount) * 0.01)} FCFA` : '';
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  onSubmit() {
    if (this.transferForm.valid) {
      console.log('Form submitted:', this.transferForm.value);
      // Handle form submission
    }
  }

}