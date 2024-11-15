import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environments'; // Chemin vers le fichier d'environnement

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


@Injectable({
  providedIn: 'root'

})

export class TransactionsService {
  
 
  private apiUrl = environment.apiUrl; // Utilisez l'URL d'API à partir de l'environnement
  
  constructor(private http: HttpClient) { }
  
  transfere(credentials: TransferRequest): Observable<TransferResponse>  {
    const token = localStorage.getItem('authToken');
 
    if (!token) {
      console.error('Le token d\'authentification est manquant.');
      return throwError(() => new Error('Le token d\'authentification est requis pour effectuer la transaction.'));
    }
    
    
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: 'Bearer ' + token, // Assurez-vous que le token est correct
      
    });
    // console.log(this.login);
    
    return this.http.post<TransferResponse>(`${this.apiUrl}/client/transfert`, credentials, { headers }).pipe(
      catchError((error) => {
        console.error('Erreur d\'API:', error);
        console.log(credentials);
        return throwError(() => new Error('Erreur lors du transfert'));
      })
    );
  }

  getContact(): Observable<any> {
    const token = localStorage.getItem('authToken');

    console.log(token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token, // Assurez-vous que le token est correct
    });

    // Requête GET vers l'URL d'accueil
    return this.http.get(`${this.apiUrl}/client/contacts`, { headers }).pipe(
      catchError((error) => {
        console.error("Erreur d'API:", error);
        return throwError(() => new Error('Erreur lors de la recuperation des contacts: '+error.message));
      })
    );
  }
  
  addcontact(credentials: { nom: string; telephone: string }): Observable<any> {
    const token = localStorage.getItem('authToken');
    
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: 'Bearer'+ token, // Assurez-vous que le token est correct

    });
    // console.log(this.login);

    return this.http.post(`${this.apiUrl}/client/contact`, credentials, { headers }).pipe(
      catchError((error) => {
        console.error('Erreur d\'API:', error);
        return throwError(() => new Error('Erreur lors de la connexion'));
      })
    );
  }
}
