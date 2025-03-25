import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TravelsService {
  constructor(private httpClient: HttpClient) {}

  private POST_ENDPOINT: string = 'travels';
  private BASE_URL: string = `${environment.api}`;
  private REQUEST_URL: string = `${this.BASE_URL}/${this.POST_ENDPOINT}`;

  getTravels(): Observable<any> {
    // return this.httpClient.get<any>(`${this.REQUEST_URL}`);
    return this.httpClient.get<any>(`${this.REQUEST_URL}`);
  }

  getById(travelId: number) {
    return this.httpClient.get<any>(`${this.REQUEST_URL}/${travelId}`);
  }

  createTravel(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.REQUEST_URL}`, data);
  }

  updateTravel(data: any, travelId: number): Observable<any> {
    return this.httpClient.put<any>(`${this.REQUEST_URL}/${travelId}`, data);
  }

  deleteTravel(travelId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.REQUEST_URL}/${travelId}`);
  }
}
