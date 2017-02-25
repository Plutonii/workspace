import {Component, OnInit} from '@angular/core';
import {UserAccessService} from "../../../services/user-access.service";
import {Router} from "@angular/router";
import {EventListenerService} from "../../../services/event-listener.service";

@Component({
    selector: 'ws-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{


    constructor(
        private accessService: UserAccessService,
        private router:Router,
        private eventListenerService:EventListenerService) {
    }

    ngOnInit(): void {
    }

    logout():void {
        this.accessService.logout().subscribe((data)=>{
         this.router.navigate(['/login']);
        }, (error:any) =>{
         console.log("header.component.ts: Error logout;");
         console.log(error);
        });
    }
}
