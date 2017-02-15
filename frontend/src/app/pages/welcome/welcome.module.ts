import {NgModule} from "@angular/core";
import {routing} from "./welcome.routing";
import {WelcomeComponent} from "./welcome.component";
@NgModule({
    imports:[routing],
    declarations:[WelcomeComponent]
})
export class WelcomeModule{}