import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent {
  codeForm: FormGroup;
  retryCount: number = 0; // Compteur des tentatives
  maxRetries: number = 5; // Nombre maximum de tentatives
  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;
  verificationCode: string | null = null; // Code de vérification reçu de l'API

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.codeForm = this.fb.group({
      code: this.fb.array(new Array(6).fill('').map(() => this.fb.control('', Validators.required)))
      
    });
  }

  get codeControls(): FormControl[] {
    return (this.codeForm.get('code') as FormArray).controls as FormControl[];
  }

 

  handleVerifyCode() {
    if (this.codeForm.valid) {
      // Récupérer le code de vérification sous forme de chaîne
      const enteredCode = this.codeControls.map(control => control.value).join('');
      const data = { code_verification: enteredCode }; // Format correct pour l'API
  
      this.authService.verifyCode(data).subscribe({
        next: (response) => {
          console.log('Code vérifié avec succès!', response);
          
          // Récupérer le token et le stocker dans le localStorage
          const token = response.data.token;
          localStorage.setItem('authToken', token);
  
          // Rediriger vers la page d'accueil ou une autre page
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.retryCount++;
          console.log(`Tentative ${this.retryCount} échouée`);
  
          // Vérifiez si le nombre maximum de tentatives est atteint
          if (this.retryCount >= this.maxRetries) {
            console.error('Nombre maximum de tentatives atteint');
            this.router.navigate(['/login']); // Rediriger vers la page de connexion
          }
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
  
  
  handleInputChange(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.handleChange(index, value);
  }

  handleChange(index: number, value: string) {
    const newCode = [...this.codeControls.map(control => control.value)];
    newCode[index] = value;
    this.codeForm.patchValue({ code: newCode });

    // Déplacez le focus vers le champ suivant s'il n'est pas le dernier
    if (value !== '' && index < 5) {
      this.codeInputs.toArray()[index + 1].nativeElement.focus();
    }

    // Vérifiez si le code est entièrement saisi et vérifiez-le
    const enteredCode = newCode.join('');
    if (enteredCode.length === 6) {
      this.handleVerifyCode(); // Vérifier le code lorsque 6 chiffres sont saisis
    }
  }
}
