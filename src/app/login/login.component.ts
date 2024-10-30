import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Ajouté
import { AuthService } from '../auth.service'; // Importez le service
@Component({
  selector: 'app-login-transfer',
  template: `
<div class="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#e7e7e7] flex items-center justify-center p-4">
  <div class="bg-[#ffffff]/90 backdrop-blur-sm rounded-2xl shadow-xl w-full max-w-md p-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
    <div class="mb-6 flex justify-center">
      <img src="path/to/your/logo.png" alt="Logo de l'application" class="h-16 w-auto" />
    </div>
    <h1 class="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#d6a3c5] to-[#a75c92] text-transparent bg-clip-text">
      SenCash
    </h1>

    <form (submit)="handleSubmit($event)" class="space-y-6 relative">
      <div class="relative group">
        <label class=" text-sm font-medium text-gray-700 mb-2 transitionblock-colors duration-200 group-hover:text-[#d6a3c5]">
          Numéro de téléphone
        </label>
        <div class="flex">
          <div class="relative">
            <button
              type="button"
              class="flex items-center justify-between w-28 px-3 py-2 border border-[#d1c6db] rounded-l-md bg-[#f9f6fa] text-sm transition-all duration-200 hover:border-[#d6a3c5] hover:shadow-sm"
              (click)="toggleDropdown()"
            >
              <span class="flex items-center">
                <span class="mr-2">{{ selectedCountry.flag }}</span>
                <span>{{ selectedCountry.code }}</span>
              </span>
            </button>

            <div
              *ngIf="isDropdownOpen"
              class="absolute z-10 mt-1 w-52 bg-[#f9f6fa]/95 backdrop-blur-sm shadow-lg rounded-md border border-[#d1c6db] max-h-60 overflow-auto transition-all duration-200"
            >
              <button
                *ngFor="let country of countries"
                type="button"
                (click)="selectCountry(country)"
                class="flex items-center w-full px-4 py-2 text-sm hover:bg-[#d6a3c5]/10 transition-colors duration-200"
              >
                <span class="mr-2">{{ country.flag }}</span>
                <span>{{ country.name }}</span>
                <span class="ml-2 text-gray-500">{{ country.code }}</span>
              </button>
            </div>
          </div>

          <div class="flex-1">
            <input
              type="tel"
              [(ngModel)]="phone"
              name="phone" 
              class="pl-10 block w-full rounded-r-md border border-[#d1c6db] py-2 text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:ring-2 focus:ring-[#d6a3c5] focus:border-[#d6a3c5] hover:border-[#d6a3c5]/50 outline-none bg-[#f9f6fa]"
              placeholder="Numéro de téléphone"
              required
            />
          </div>
        </div>
      </div>

      <div class="group">
        <label class="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-hover:text-[#d6a3c5]">
          Code PIN (4 chiffres)
        </label>
        <div class="relative">
          <input
            type="password"
            [(ngModel)]="pin"
            name="pin" 
            maxLength="4"
            (input)="onPinInput($event)"
            class="block w-full rounded-md border border-[#d1c6db] py-2 text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:ring-2 focus:ring-[#d6a3c5] focus:border-[#d6a3c5] hover:border-[#d6a3c5]/50 outline-none bg-[#f9f6fa]"
            placeholder="****"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full text-white rounded-md py-3 px-4 transition-all duration-300 transform hover:translate-y-[-1px] hover:shadow-lg bg-gradient-to-r from-[#d6a3c5] to-[#a75c92] hover:from-[#b57b94] hover:to-[#9b4f73] shadow-lg"
      >
        Se connecter
      </button>
    </form>
  </div>
</div>
  `,
  standalone: true,
  imports: [FormsModule,CommonModule],
})
export class LoginTransferComponent {
  selectedCountry: { name: string; code: string; flag: string } = {
    name: 'Sénégal',
    code: '+221',
    flag: '🇸🇳',
  };
  phone: string = '';
  pin: string = '';
  isDropdownOpen: boolean = false;
  errorMessage: string = ''; // Déclarez la propriété errorMessage


  countries = [
    { name: 'Sénégal', code: '+221', flag: '🇸🇳' },
    { name: 'Mali', code: '+223', flag: '🇲🇱' },
    { name: "Côte d'Ivoire", code: '+225', flag: '🇨🇮' },
    { name: 'Burkina Faso', code: '+226', flag: '🇧🇫' },
    { name: 'Togo', code: '+228', flag: '🇹🇬' },
    { name: 'Bénin', code: '+229', flag: '🇧🇯' },
    { name: 'Guinée', code: '+224', flag: '🇬🇳' },
    
  ];

  constructor(private router: Router, private authService: AuthService) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCountry(country: { name: string; code: string; flag: string }) {
    this.selectedCountry = country;
    this.isDropdownOpen = false; // Ferme le dropdown après sélection
  }

  onPinInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pin = input.value.replace(/[^0-9]/g, '');
  }
  handleSubmit(event: Event) {
    event.preventDefault();
    const fullPhoneNumber = `${this.selectedCountry.code}${this.phone}`;
    console.log('Données d\'authentification:', { telephone: fullPhoneNumber, password: this.pin });
  
    this.authService.login({ telephone: fullPhoneNumber, password: this.pin }).subscribe({
      next: (response) => {
        console.log('Connexion réussie:', response);
        this.router.navigate(['verification']);
      },
      error: (error) => {
        console.error('Erreur lors de la connexion:', error);
        this.errorMessage = "Une erreur de serveur s'est produite. Veuillez réessayer.";
      }
    });
  }
  


  
}
