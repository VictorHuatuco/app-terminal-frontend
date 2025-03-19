export interface Announcement {
  id: number;
  company: string;
  destination: string;
  departureTime: string;
  boardingGate?: string;
  observation?: string;
}
