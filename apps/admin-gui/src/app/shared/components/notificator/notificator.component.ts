import { Component, HostListener } from '@angular/core';
import {NotificationData} from '@perun-web-apps/perun/models';
import {NotificatorService} from '@perun-web-apps/perun/services';
import {flyInOut} from '../../animations/Animations';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';
import { NotificationStorageService } from '../../../core/services/common/notification-storage.service';

@Component({
  selector: 'app-notificator',
  templateUrl: './notificator.component.html',
  styleUrls: ['./notificator.component.scss'],
  animations: [
    flyInOut
  ]
})
export class NotificatorComponent {

  constructor(
    private notificator: NotificatorService,
    private notificationStorageService: NotificationStorageService
  ) {
    this.notificator.addNotification.subscribe(notificationData => {
      this.processNotification(notificationData);
    });
    this.getScreenSize();
  }

  private mobileView = false;

  notifications: NotificationData[] = [];

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.mobileView = window.innerWidth <= AppComponent.minWidth;
  }

  private processNotification(data: NotificationData): void {
    this.notifications.push(data);
    this.notificationStorageService.storeNotification(data);
  }

  getNotificatorTop() {
    if (this.mobileView) {
      return 'initial';
    }
    return environment.production ? '112px' : '64px';
  }

  removeNotification(index: number){
    this.notifications.splice(index, 1);
  }
}
