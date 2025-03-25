export interface Announcement {
  id: number;
  company: string;
  destination: string;
  departure_time: string;
  boarding_gate?: string;
  observation?: string;
}
