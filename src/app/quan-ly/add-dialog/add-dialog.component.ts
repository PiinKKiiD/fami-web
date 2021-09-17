import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FilmService} from "../../share/film.service";
import {FilmModel} from "../../share/film.model";
import {DataStorageService} from "../../share/data-storage.service";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  addForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              private filmService: FilmService,
              private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(){
    console.log('saving');
    const newFilm = new FilmModel(
      '',
      this.addForm.value['filmNote'],
      new Date(),
      this.addForm.value['filmName'],
      0,
      this.addForm.value['filmType']
    );
    this.filmService.addFilmToQuanLy(newFilm);
    this.dialogRef.close();
  }
  onCancel(){
    this.addForm.reset();
    this.dialogRef.close();
  }

  private initForm(){
    let filmName = '';
    let filmType = '';
    let filmNote = '';
    this.addForm = new FormGroup({
      'filmName': new FormControl(filmName, Validators.required),
      'filmType': new FormControl(filmType, Validators.required),
      'filmNote': new FormControl(filmNote)
    });
  }
}
