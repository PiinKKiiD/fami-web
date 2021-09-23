import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FilmService} from "../../share/film.service";

@Component({
  selector: 'app-del-film-confirm',
  templateUrl: './del-film-confirm.component.html',
  styleUrls: ['./del-film-confirm.component.css']
})
export class DelFilmConfirmComponent implements OnInit {
  index: number;
  constructor(public dialogRef: MatDialogRef<DelFilmConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private filmService: FilmService) {
    this.index = data['index'];
  }

  ngOnInit(): void {
  }

  onCancel(){
    this.dialogRef.close();
  }

  onDelete(){
    this.filmService.delFilmFromQuanLy(this.index).subscribe();
    console.log('deleting ', this.index);
    this.dialogRef.close();
  }

}
