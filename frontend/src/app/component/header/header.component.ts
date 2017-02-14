import {Component, OnInit} from '@angular/core';
import {UserAccessService} from "../../service/user-access.service";

@Component({
    selector: 'ws-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

    constructor(private accessService: UserAccessService) {
    }

    ngOnInit(): void {
    }

    logout():void {
        this.accessService.logout().subscribe((data)=>{
            console.log(data);
        }, (error:any) =>{
            console.log("error in Log" + error);
        });
    }
}
