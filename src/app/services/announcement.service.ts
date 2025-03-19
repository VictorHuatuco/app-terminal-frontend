import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private httpClient: HttpClient) {}

  private POST_ENDPOINT: string = 'announcements';
  private BASE_URL: string = `${environment.api}`;
  private REQUEST_URL: string = `${this.BASE_URL}/${this.POST_ENDPOINT}`;

  getById(id: number) {}
  createAnnouncement(data: any) {}
  updateAnnouncement(data: any) {}
}
