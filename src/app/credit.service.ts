
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environments'; // Chemin vers le fichier d'environnement

@Injectable({
  providedIn: 'root'

})

export class CreditService {
  
 
  private apiUrl = environment.apiUrl; // Utilisez l'URL d'API à partir de l'environnement
  
  constructor(private http: HttpClient) { }
  
  credit(credentials: { nom_contact: string; telephone_contact: string ,montant:number}): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: 'Bearer ' + token, 

    });
    // console.log(this.login);

    return this.http.post(`${this.apiUrl}/client/credit`, credentials, { headers }).pipe(
      catchError((error) => {
        console.error('Erreur d\'API:', error);
        return throwError(() => new Error('Erreur lors du recharge'));
      })
    );
  }

}