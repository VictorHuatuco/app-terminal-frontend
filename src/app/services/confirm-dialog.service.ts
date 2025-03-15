import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../shared/components/modals/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

  confirm(data: ConfirmDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data,
    });

    return dialogRef.afterClosed();
  }
}
