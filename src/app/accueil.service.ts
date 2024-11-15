import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AccueilService {
  private apiUrl = environment.apiUrl; // URL d'API depuis l'environnement

  constructor(private http: HttpClient) {}

  getAccueil(): Observable<any> {
    const token = localStorage.getItem('authToken');

    console.log(token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token, // Assurez-vous que le token est correct
    });

    // Requête GET vers l'URL d'accueil
    return this.http.get(`${this.apiUrl}/client/accueil`, { headers }).pipe(
      catchError((error) => {
        console.error("Erreur d'API:", error);
        return throwError(() => new Error('Erreur lors de la recuperation de donnée: '+error.message));
      })
    );
  }
}
