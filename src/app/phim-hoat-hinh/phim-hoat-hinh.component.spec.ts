import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhimHoatHinhComponent } from './phim-hoat-hinh.component';
import {FilmService} from "../share/film.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {FilmModel} from "../share/film.model";
import {Observable, Subject} from "rxjs";
import {DataStorageService} from "../share/data-storage.service";


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
  const filmlist : FilmModel[] = [film1, film2]
  let phimhots : FilmModel[] = [film2, film1];

  const filmService = {
    filmsChanged: new Subject<FilmModel[]>(),

    getFilmHots(type: string){return phimhots; },
    getFilms(type: string){
      return [];
    }
  }
  const datatStorageService ={
    fetchFilm(type: string): Observable<FilmModel[]>{
      return new Observable<FilmModel[]>(o =>{
        o.next(filmlist);
      })
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
            { provide: DataStorageService, useValue: datatStorageService},
          ]}
      })
      .compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [FilmService, HttpClient, HttpHandler],
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
    component.onGetFilmHots();
    fixture.detectChanges();
    expect(component.onGetFilmHots()).toEqual(phimhots);
  });

  it('should return filmlist onInit', ()=>{
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.phimhoathinhs).toEqual(filmlist)
  });

});
