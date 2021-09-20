import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhimHoatHinhComponent } from './phim-hoat-hinh.component';
import {FilmService} from "../share/film.service";
import {RouterTestingModule} from "@angular/router/testing";
import {FilmModel} from "../share/film.model";
import {Observable, Subject} from "rxjs";


describe('PhimHoatHinhComponent', () => {
  let component: PhimHoatHinhComponent;
  let fixture: ComponentFixture<PhimHoatHinhComponent>;

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

    getPhimHoatHinhHots$(){
      return new Observable<FilmModel[]>( o => {o.next(phimhots); }); }
    ,
    getPhimHoatHinhs$(){
      return new Observable<FilmModel[]>( o => {o.next(phimlist)} );
   }
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ PhimHoatHinhComponent ]}).overrideComponent(PhimHoatHinhComponent,
      {
        set:{
          providers: [
            { provide: FilmService, useValue: filmService},
          ]}
      })
      .compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [FilmService],
      declarations: [ PhimHoatHinhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhimHoatHinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a film list',()=>{
    component.ngOnInit();
    fixture.detectChanges();
    let films = [];
    component.phimhots$.subscribe(fs =>{ films = fs });
    expect(films).toEqual(phimhots);
  });

  it('should return filmlist onInit', ()=>{
    component.ngOnInit();
    fixture.detectChanges();
    let films = [];
    component.phimhoathinhs$.subscribe(fs =>{ films = fs });
    expect(films).toEqual(phimlist);
  });

});
