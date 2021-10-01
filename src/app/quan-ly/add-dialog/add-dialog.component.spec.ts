import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { AddDialogComponent } from './add-dialog.component';
import { MatDialogRef} from "@angular/material/dialog";
import {FilmService} from "../../share/film.service";
import {Observable, Subject} from "rxjs";
import {FilmModel} from "../../share/film.model";
import { QuanLyModule } from '../quan-ly.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from 'src/app/app.module';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const film1: FilmModel ={
    avatar: 'https://upload.wikimedia.org/wikipedia/vi/d/df/Arrival%2C_Movie_Poster.jpg',
    note: 'dump note',
    createDate: new Date(),
    name: 'dump name',
    rate: 9,
    type: 'dump type',
  } as FilmModel;
  const film2: FilmModel ={
    avatar: 'https://upload.wikimedia.org/wikipedia/vi/d/df/Arrival%2C_Movie_Poster.jpg',
    note: 'dump note 2',
    createDate: new Date(),
    name: 'dump name 2',
    rate: 9,
    type: 'dump type 2',
  } as FilmModel;
  const phimlist : FilmModel[] = [film1, film2, film1]
  const phimhots : FilmModel[] = [film2, film1];

  const filmService = {
    filmsChanged: new Subject<FilmModel[]>(),
    addFilmToQuanLy(film: FilmModel){
      return new Observable<FilmModel[]>( o => {
        o.next(phimlist);
      })
    }

    // getPhimLeHots$(){
    //   return new Observable<FilmModel[]>( o => {o.next(phimhots); }); }
    // ,
    // getPhimLes$(){
    //   return new Observable<FilmModel[]>( o => {o.next(phimlist)} ); }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanLyModule, BrowserAnimationsModule, MatFormFieldModule, AppModule],
      providers: [{
        provide: MatDialogRef,
        useValue: mockDialogRef
      },
        {provide: FilmService, useValue: filmService}
      ],
      declarations: [ AddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new form with 3 controls', () => {
    component.ngOnInit();
    expect(component.addForm.contains('filmName')).toBeTruthy();
    expect(component.addForm.contains('filmNote')).toBeTruthy();
    expect(component.addForm.contains('filmType')).toBeTruthy();
  });

  it('should make the name control required', () => {
    let control1 = component.addForm.get('filmName');
    let control2 = component.addForm.get('filmType');
    control1.setValue('');
    control2.setValue('');
    expect(control1.valid).toBeFalsy();
    expect(control2.valid).toBeFalsy();
  });

  it('should call dialofRef.close() when onCancel is trggered', () => {
    component.onCancel();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should call filmService.addFilmToQuanLy(newFilm) when onSubmit is triggered', fakeAsync(() => {
    component.onSubmit();
    flush();
    expect(component.dialogRef.close).toHaveBeenCalled();
  }))


});
