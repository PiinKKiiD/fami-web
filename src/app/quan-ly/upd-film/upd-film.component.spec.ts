import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FilmService} from "../../share/film.service";
import {RouterTestingModule} from "@angular/router/testing";
import {UpdFilmComponent} from "./upd-film.component";
import { FilmModel } from 'src/app/share/film.model';
import { Observable, Subject } from 'rxjs';

describe('AddDialogComponent', () => {
  let component: UpdFilmComponent;
  let fixture: ComponentFixture<UpdFilmComponent>;
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
  const phimlist : FilmModel[] = [film1, film2]
  const phimhots : FilmModel[] = [film2, film1];

  const filmService = {
    filmsChanged: new Subject<FilmModel[]>(),

    getPhimLeHots$(){
      return new Observable<FilmModel[]>( o => {o.next(phimhots); }); }
    ,
    getPhimLes$(){
      return new Observable<FilmModel[]>( o => {o.next(phimlist)} );
   },
    getFilmFromQuanLy(index: number){
      return film1;
   }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, RouterTestingModule],
      providers: [{
        provide: MatDialogRef,
        useValue: mockDialogRef
      },{ provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: FilmService, useValue: filmService}
      ],
      declarations: [ UpdFilmComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdFilmComponent);
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

  it('should include old content in 3 controls', () => {
    let control1 = component.addForm.get('filmName');
    let control2 = component.addForm.get('filmType');
    let control3 = component.addForm.get('filmNote');
    // control1.setValue('');
    // control2.setValue('');
    expect(control1.value).toBe(film1.name);
    expect(control2.value).toBe(film1.type);
    expect(control3.value).toBe(film1.note);
  });

  it('should include old content in 2 validation controls', () => {
    let control1 = component.addForm.get('filmName');
    let control2 = component.addForm.get('filmType');
    control1.setValue('');
    control2.setValue('');
    expect(control1.valid).toBeFalsy;
    expect(control2.valid).toBeFalsy;
  });

});
