import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {TransactionsService} from '../transaction.service';
 
interface contact {
  id: number;
  nom: string;
  telephone: string;
}

// Définissez d'abord les interfaces pour typer vos données
interface TransferRequest {
  montant_recus: number; // Notez que c'est un number, pas une string
  telephone: string;
}

interface TransferResponse {
  data: {
    id: number;
    sender_id: number;
    montant_envoye: number;
    montant_recus: number;
    type_transaction: string;
    statut: string;
    frais_id: number | null;
    receiver_id: number;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
  status: string;
}
@Component({
  selector: 'app-transactions',
  templateUrl: './transaction.component.html',

  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class TransactionsComponent {
  contacts: any[] = []; // Créez une propriété pour stocker les contacts récupérés

  transferForm: FormGroup;
  showNewRecipientForm = false;
  showAmountFields = false;
  activeTab: string = '';
  isExistingContact = false;
  selectedFavorite: contact | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  


  contact: contact[] = [
    
  ];

  menuItems = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'Transactions', icon: 'fas fa-paper-plane' },
    { name: 'Crédit', icon: 'fas fa-credit-card' },
    { name: 'Banque', icon: 'fas fa-building' },
    { name: 'Paiement', icon: 'fas fa-piggy-bank' }
  ];

  constructor(private fb: FormBuilder, private router: Router , private transactionsService: TransactionsService) {
    this.transferForm = this.fb.group({
      recipient: ['', Validators.required],
      newPhone: [''],
      firstName: [''],
      lastName: [''],
        amount: ['', [Validators.required, Validators.min(1)]]
    });
  }




  ngOnInit(): void {
   this.fetchContacs();
    // this.HandleSubmit();
    
  }


  fetchContacs() {
    this.transactionsService.getContact().subscribe({
      next: (data) => {
        console.log(data.data);
        this.contacts = data.data;
      },
      error: (error) => {
        console.error('Erreur lors de la recuperation des donnnee:', error);
        this.errorMessage =
          "Une erreur de serveur s'est produite. Veuillez réessayer.";
      },
    });
  }
 
  public handleSubmit(event: Event): void {
    event.preventDefault();

    // Récupération des champs du formulaire
    let montantRecus = this.transferForm.get('amount')?.value;
    const telephone = this.transferForm.get('newPhone')?.value || this.selectedFavorite?.telephone;

    // Vérification de nullité
    if (!montantRecus || !telephone) {
        this.errorMessage = 'Veuillez remplir tous les champs.';
        return;
    }

    // Conversion du montant en nombre
    montantRecus = Number(montantRecus);
    if (isNaN(montantRecus)) {
        this.errorMessage = 'Le montant doit être un nombre valide.';
        return;
    }

    // Préparation des données à envoyer
    const transferData: TransferRequest = {
        montant_recus: montantRecus,
        telephone: telephone
    };

    console.log('Données à envoyer:', transferData);
    
    // Envoi de la transaction au serveur
    this.transactionsService.transfere(transferData).subscribe({
      next: (response: TransferResponse) => {
        console.log('Transaction effectuée avec succès:', response);
        this.successMessage = response.message;
        this.transferForm.reset();
        this.selectedFavorite = null;
        },
        error: (error) => {
            console.error('Erreur lors de la transaction:', error);
            this.errorMessage = error.error?.message || `Erreur ${error.status}: Une erreur est survenue lors du transfert`;
        }
    });
}


  checkRecipient(event: any) {
    const inputValue = event.target.value;
    // Check if the entered number matches any favorite
    const matchingFavorite = this.contact.find(f => 
      inputValue.includes(f.telephone) || inputValue.includes(f.nom)
    );

    if (matchingFavorite) {
      this.selectFavorite(matchingFavorite);
    } else {
      this.showNewRecipientForm = true;
      this.isExistingContact = false;
      this.selectedFavorite = null;
      this.showAmountFields = false;
    }
  }

  selectFavorite(contact: contact) {
    this.selectedFavorite = contact;
    this.isExistingContact = true;
    this.showNewRecipientForm = false;
    this.showAmountFields = true;
    
    this.transferForm.patchValue({
      recipient: `${contact.nom} - ${contact.telephone}`
    });
  }

  isSelectedFavorite(favorite: contact): boolean {
    return this.selectedFavorite?.id === favorite.id;
  }

  toggleNewRecipientForm() {
    this.showNewRecipientForm = !this.showNewRecipientForm;
    this.showAmountFields = false;
    this.isExistingContact = false;
    this.selectedFavorite = null;
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

  onSubmit() {
    if (this.transferForm.valid) {
      console.log('Form submitted:', this.transferForm.value);
      // Handle form submission
    }
  }

}