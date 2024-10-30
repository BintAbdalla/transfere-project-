import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Ajout de l'importation de Router

@Component({
  selector: 'app-home',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#e7e7e7]">
      <!-- Sidebar -->
      <nav class="fixed left-0 top-0 h-full w-72 bg-[#ffffff]/90 backdrop-blur-sm shadow-xl border-r border-gray-100">
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
      <div class="ml-72 p-8">
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

        <!-- Balance and QR Row -->
        <div class="grid grid-cols-2 gap-8 mb-8">
          <!-- Balance Card -->
          <div class="bg-[#ffffff]/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-xl font-bold text-gray-700 mb-6">Montant total</h2>
                <div class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#d6a3c5] to-[#a75c92]">
                  {{ totalAmount | number }}F
                </div>
              </div>
              <div class="bg-gradient-to-r from-[#d6a3c5] to-[#a75c92] p-4 rounded-xl shadow-lg">
                <i class="fas fa-wallet text-white text-2xl"></i>
              </div>
            </div>
          </div>

          <!-- QR Code Card -->
          <div class="bg-[#ffffff]/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105">
            <div class="flex flex-col items-center justify-center h-full">
              <img src="/api/placeholder/200/200" alt="QR Code" class="w-40 h-40 mb-4" />
              <p class="text-sm text-gray-500">Scanner pour payer</p>
            </div>
          </div>
        </div>

        <!-- Transactions List -->
        <div class="bg-[#ffffff]/90 backdrop-blur-sm rounded-2xl shadow-lg">
          <div class="p-8">
            <h2 class="text-xl font-bold text-gray-700 mb-6">Transactions récentes</h2>
            <div class="space-y-2">
              <div *ngFor="let transaction of recentTransactions"
                class="flex justify-between items-center p-4 rounded-xl hover:bg-[#d6a3c5]/10 transition-all duration-300 border border-transparent hover:border-gray-100">
                <div class="flex items-center space-x-4">
                  <div class="p-3 rounded-xl" [ngClass]="{
                    'bg-green-100 text-green-600': transaction.amount > 0,
                    'bg-red-100 text-red-600': transaction.amount < 0
                  }">
                    <i [ngClass]="transaction.amount > 0 ? 'fas fa-arrow-down' : 'fas fa-arrow-up'"></i>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-800">{{ transaction.name }}</p>
                    <p class="text-sm text-gray-500">{{ transaction.date }}</p>
                  </div>
                </div>
                <span [ngClass]="{
                  'font-bold text-lg text-green-600': transaction.amount > 0,
                  'font-bold text-lg text-red-600': transaction.amount < 0
                }">
                  {{ transaction.amount > 0 ? '+' : '' }}{{ transaction.amount }}F
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .min-h-screen {
      min-height: 100vh;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet
  ]
})
export class HomeComponent {
  totalAmount = 25000;
  recentTransactions = [
    { id: 1, name: "Jean Dupont", amount: -150, date: "2024-10-28" },
    { id: 2, name: "Marie Martin", amount: 300, date: "2024-10-27" },
    { id: 3, name: "Paul Bernard", amount: -75, date: "2024-10-26" }
  ];

  menuItems = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'Transactions', icon: 'fas fa-paper-plane' },
    { name: 'Crédit', icon: 'fas fa-credit-card' },
    { name: 'Banque', icon: 'fas fa-building' },
    { name: 'Paiement', icon: 'fas fa-piggy-bank' }
  ];

  activeTab: string = 'Dashboard'; // Default active tab

  constructor(private router: Router) {} // Injectez Router

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
    if (tabName === 'Transactions') {
      this.router.navigate(['/transactions']); // Navigue vers le composant Transactions
    }
  }
}
