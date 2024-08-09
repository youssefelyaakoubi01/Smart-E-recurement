import { Injectable } from '@angular/core';
import { Offre } from '../models/offre';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OffresService {
  offres!: Offre[];
  constructor(private http: HttpClient) {}
  listOffres() {}
  searchOffers(cv: FormData): Observable<any> {
    return this.http.post('http://localhost:8000/search_offers', cv);
  }
}
