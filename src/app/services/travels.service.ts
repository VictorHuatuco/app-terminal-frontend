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
    return this.httpClient.get<any>(`${this.REQUEST_URL}`);
  }
}
