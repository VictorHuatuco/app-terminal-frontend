import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private httpClient: HttpClient) {}

  private POST_ENDPOINT: string = 'announcements';
  private BASE_URL: string = `${environment.api}`;
  private REQUEST_URL: string = `${this.BASE_URL}/${this.POST_ENDPOINT}`;

  getAnnouncements(): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}/`);
  }

  getById(announcementId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.REQUEST_URL}/${announcementId}`);
  }

  createAnnouncement(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.REQUEST_URL}`, data);
  }

  updateAnnouncement(data: any, announcementId: number): Observable<any> {
    return this.httpClient.put<any>(
      `${this.REQUEST_URL}/${announcementId}`,
      data
    );
  }

  deleteAnnouncement(announcementId: number, status: boolean): Observable<any> {
    return this.httpClient.patch<any>(
      `${this.REQUEST_URL}/${announcementId}/status?status=${status}`,
      {} // Se envía en el cuerpo de la petición
    );
  }
}
