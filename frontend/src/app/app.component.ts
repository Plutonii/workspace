import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {UserAccessService} from "./services/user-access.service";
import {EventListenerService} from "./services/event-listener.service";

@Component({
    selector: 'ws-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    @ViewChild("myAlert")
    private myAlert: ElementRef;

    constructor(private accessService: UserAccessService,
                private eventListenerService: EventListenerService) {
    }

    ngOnInit(): void {
        this.accessService.init();
        this.eventListenerService.subscribeAlertMsg.subscribe((msg:string) => {
            this.myAlert.nativeElement.innerText = msg;
            this.myAlert.nativeElement.classList.add("show-alert");
            let that = this;
            setTimeout(function () {
                that.myAlert.nativeElement.classList.remove("show-alert");
            }, 13100);
        });
    }

}
