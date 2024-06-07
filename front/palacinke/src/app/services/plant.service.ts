import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Plant } from '../models/plant';
import { PlantRequestBody } from '../models/plantRequestBody';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private apiUrl = 'http://localhost:8080/api'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) {}
  
  addPlant(request: PlantRequestBody): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<boolean>(`${this.apiUrl}/add`, request, { headers })
      .pipe(catchError(this.handleError<boolean>('addPlant', false)));
  }

  getAllPlants(): Observable<Plant[]> {
    return this.http
      .get<Plant[]>(`${this.apiUrl}/all`)
      .pipe(catchError(this.handleError<Plant[]>('getAllPlants', [])));
  }

  getPlantHumidity(id: string): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrl}/humidity/${id}`)
      .pipe(catchError(this.handleError<number>('getPlantHumidity', -1)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
