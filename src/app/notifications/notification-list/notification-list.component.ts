import { Component, Input, OnDestroy } from '@angular/core';

import { Notification } from '../../shared/models';
import { NotificationService } from '../notification.service';


@Component({
    selector: 'notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnDestroy {
    @Input() notification;

    public items: Notification[];
    private sub;

    constructor(private service: NotificationService) {
        this.items = [];
        this.sub = this.service.added.subscribe(item => {
            this.items.push(item);
            if (item.timeout) {
                setTimeout(() => this.remove(item), item.timeout);
            }
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    remove(item: Notification) {
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
    }
}
