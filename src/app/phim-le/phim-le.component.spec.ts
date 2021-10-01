import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhimLeComponent } from './phim-le.component';
import {FilmService} from "../share/film.service";
import {FilmModel} from "../share/film.model";
import {Observable, Subject} from "rxjs";
import { ShareModule } from '../share/share.module';
import { AppModule } from '../app.module';


describe('PhimLeComponent', () => {
  let component: PhimLeComponent;
  let fixture: ComponentFixture<PhimLeComponent>;

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
   }
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareModule, AppModule],
      declarations: [ PhimLeComponent ]}).overrideComponent(PhimLeComponent,
      {
        set:{
          providers: [
            { provide: FilmService, useValue: filmService},
          ]}
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhimLeComponent);
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
    component.phimles$.subscribe(fs =>{ films = fs });
    expect(films).toEqual(phimlist);
  });

});

