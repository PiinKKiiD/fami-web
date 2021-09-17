import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
//import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import {AlertComponent} from "../share/alert/alert.component";
import {LoadingSpinnerComponent} from "../share/loading-spinner/loading-spinner.component";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations:[AuthComponent, AlertComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: AuthComponent}
    ]),
    MatButtonModule,
    MatInputModule,
    //SharedModule,
  ]
})
export class AuthModule{

}
