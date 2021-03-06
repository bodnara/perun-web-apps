import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResourcesManagerService, Vo, VosManagerService } from '@perun-web-apps/perun/openapi';
import { NotificatorService } from '@perun-web-apps/perun/services';
import { TranslateService } from '@ngx-translate/core';

export interface CreateResourceDialogData {
  theme: string;
  facilityId: number;
}

@Component({
  selector: 'app-create-resource-dialog',
  templateUrl: './create-resource-dialog.component.html',
  styleUrls: ['./create-resource-dialog.component.scss']
})
export class CreateResourceDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CreateResourceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: CreateResourceDialogData,
              private notificator: NotificatorService,
              private voService: VosManagerService,
              private translate: TranslateService,
              private resourcesManager: ResourcesManagerService
  ) {
    translate.get('DIALOGS.CREATE_RESOURCE.SUCCESS').subscribe(value => this.successMessage = value);
  }

  nameCtrl: FormControl;
  descriptionCtrl: FormControl;
  organizationCtrl: FormControl = new FormControl();
  vos: Vo[] = [];
  filteredVos: Observable<Vo[]>;

  theme: string;
  loading: boolean;
  selectedVo: Vo = null;
  successMessage: string;

  ngOnInit() {
    this.theme = this.data.theme;
    this.voService.getAllVos().subscribe(vos => {
      this.vos = vos;

      this.filteredVos = this.organizationCtrl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });

    this.nameCtrl = new FormControl(null, [Validators.required, Validators.pattern('.*[\\S]+.*')]);
    this.descriptionCtrl = new FormControl(null, [Validators.required, Validators.pattern('.*[\\S]+.*')]);
  }

  _filter(value: string): Vo[] {
    const filterValue = value.toLowerCase();
    return this.vos.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {
    this.loading = true;
    this.resourcesManager.createResource(this.selectedVo.id, this.data.facilityId, this.nameCtrl.value, this.descriptionCtrl.value).subscribe(() => {
      this.notificator.showSuccess(this.successMessage);
      this.loading = false;
      this.dialogRef.close(true);
    }, () => this.loading = false);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
