import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserExtSource, UsersManagerService} from '@perun-web-apps/perun/openapi';
import { MatTableDataSource } from '@angular/material/table';

export interface RemoveUserExtSourceDialogData {
  extSources: UserExtSource[]
}

@Component({
  selector: 'perun-web-apps-remove-user-ext-source-dialog',
  templateUrl: './remove-user-ext-source-dialog.component.html',
  styleUrls: ['./remove-user-ext-source-dialog.component.scss']
})
export class RemoveUserExtSourceDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<RemoveUserExtSourceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: RemoveUserExtSourceDialogData,
    private usersManagerService: UsersManagerService
  ) {
  }

  successMessage: string;
  theme: string;
  force = false;
  loading: boolean;

  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<UserExtSource>;

  ngOnInit() {
    // this.theme = this.data.theme;
    this.dataSource = new MatTableDataSource<UserExtSource>(this.data.extSources);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    this.loading = true;
    //TODO there will be method for removing selected identity
  }

}
