import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmModel } from '../share/film.model';
import { Observable, Subscription } from 'rxjs';
import { FilmService } from '../share/film.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { DelFilmConfirmComponent } from './del-film-confirm/del-film-confirm.component';
import { UpdFilmComponent } from './upd-film/upd-film.component';

@Component({
  selector: 'app-quan-ly',
  templateUrl: './quan-ly.component.html',
  styleUrls: ['./quan-ly.component.css'],
})
export class QuanLyComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'id',
    'name',
    'type',
    'createDate',
    'rate',
    'note',
    'acts',
  ];
  quanlys: FilmModel[] = [];
  subscription: Subscription;
  tempSup: Subscription;
  id: number;
  constructor(private filmService: FilmService, public matDialog: MatDialog) {}

  ngOnInit(): void {
    this.tempSup = this.filmService.getQuanLys$().subscribe();
    this.subscription = this.filmService.filmsChanged.subscribe((qlys) => {
      console.log('films is changed', qlys);
      this.quanlys = qlys;
    });
    console.log('after fetching data:', this.quanlys);
  }

  // public getQuanLys(){
  //   this.quanlys = this.filmService.getQuanLys();
  // }

  onAdd() {
    const matDialogConf = new MatDialogConfig();
    matDialogConf.disableClose = true;
    matDialogConf.autoFocus = true;
    const dialogRef = this.matDialog.open(AddDialogComponent, matDialogConf);
  }

  onDel(id: number) {
    const matDialogConf = new MatDialogConfig();
    matDialogConf.disableClose = true;
    matDialogConf.autoFocus = true;
    matDialogConf.data = { index: id };
    const dialogRef = this.matDialog.open(
      DelFilmConfirmComponent,
      matDialogConf
    );
    //dialogRef.afterClosed().subscribe(() => { console.log('get01'), this.getQuanLys$() } );
  }

  onUpdate(id: number) {
    const matDialogConf = new MatDialogConfig();
    matDialogConf.disableClose = true;
    matDialogConf.autoFocus = true;
    matDialogConf.data = { index: id };
    const dialogRef = this.matDialog.open(UpdFilmComponent, matDialogConf);
    //dialogRef.afterClosed().subscribe(() => { this.getQuanLys$();} );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.tempSup.unsubscribe();
  }
}
