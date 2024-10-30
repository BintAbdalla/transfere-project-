import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environments'; // Chemin vers le fichier d'environnement

@Injectable({
  providedIn: 'root'

})

export class AuthService {
  
 
  private apiUrl = environment.apiUrl; // Utilisez l'URL d'API à partir de l'environnement
  
  constructor(private http: HttpClient) { }
  
  login(credentials: { telephone: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    // console.log(this.login);

    return this.http.post(`${this.apiUrl}/login`, credentials, { headers }).pipe(
      catchError((error) => {
        console.error('Erreur d\'API:', error);
        return throwError(() => new Error('Erreur lors de la connexion'));
      })
    );
  }
 // Vérifie le code de vérification saisi
verifyCode(data: { code_verification: string }): Observable<any> {
  const headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Accept": "application/json"
  });

  // Affiche le format des données dans la console
  console.log('Données envoyées pour la vérification du code:', data);

  return this.http.post(`${this.apiUrl}/verifytoken`, data, { headers }).pipe(
    catchError((error) => {
      console.error('Erreur lors de la vérification du code:', error);
      return throwError(() => new Error('Erreur lors de la vérification du code'));
    })
  );
}
  
}
