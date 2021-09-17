import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FilmService} from "../../share/film.service";
import {FilmModel} from "../../share/film.model";

@Component({
  selector: 'app-upd-film',
  templateUrl: './upd-film.component.html',
  styleUrls: ['./upd-film.component.css']
})
export class UpdFilmComponent implements OnInit {
  addForm: FormGroup;
  index: number;
  constructor(public dialogRef: MatDialogRef<UpdFilmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private filmService: FilmService) {
    this.index = data['index'];
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(){
    console.log('updating');
    let newFilm = this.filmService.getFilmFromQuanLy(this.index);
    newFilm.name = this.addForm.value['filmName'];
    newFilm.type = this.addForm.value['filmType'];
    newFilm.note = this.addForm.value['filmNote'];
    this.filmService.updateFilmToQuanLy(newFilm, this.index);
    this.dialogRef.close();
  }
  onCancel(){
    this.addForm.reset();
    this.dialogRef.close();
  }

  private initForm(){
    const newFilm: FilmModel = this.filmService.getFilmFromQuanLy(this.index);
    const filmName = newFilm.name;
    const filmType = newFilm.type;
    const filmNote = newFilm.note;
    this.addForm = new FormGroup({
      'filmName': new FormControl(filmName, Validators.required),
      'filmType': new FormControl(filmType, Validators.required),
      'filmNote': new FormControl(filmNote)
    });
  }
}
