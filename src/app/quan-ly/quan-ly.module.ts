import {NgModule} from "@angular/core";
import {QuanLyComponent} from "./quan-ly.component";
import {UpdFilmComponent} from "./upd-film/upd-film.component";
import {DelFilmConfirmComponent} from "./del-film-confirm/del-film-confirm.component";
import {AddDialogComponent} from "./add-dialog/add-dialog.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShareModule} from "../share/share.module";
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations:[
    QuanLyComponent,
    UpdFilmComponent,
    DelFilmConfirmComponent,
    AddDialogComponent],
  imports: [
    FormsModule,
    RouterModule,
    ShareModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: QuanLyComponent}
    ]),
    MatTableModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[
    QuanLyComponent,
    UpdFilmComponent,
    DelFilmConfirmComponent,
    AddDialogComponent],
  entryComponents: [AddDialogComponent, DelFilmConfirmComponent, UpdFilmComponent],
})
export class QuanLyModule{

}
