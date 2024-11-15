import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root', // Ce service est disponible au niveau de toute l'application
})
export class BanqueService {

  // La méthode effectuerVirement retourne un Observable<boolean>
  effectuerVirement(fromAccount: string, toAccount: string, amount: number): Observable<boolean> {
    // Logique de virement simulée avec 80% de chance de succès
    const isTransferSuccessful = Math.random() > 0.2;  // 80% de chances de succès
    return of(isTransferSuccessful);
  }
}
