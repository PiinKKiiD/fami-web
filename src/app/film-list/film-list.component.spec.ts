import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { FilmModel } from '../share/film.model';
import { FilmListItemComponent } from './film-list-item/film-list-item.component';

import { FilmListComponent } from './film-list.component';

describe('FilmListComponent', () => {
  let component: FilmListComponent;
  let fixture: ComponentFixture<FilmListComponent>;
  let el: DebugElement;

  //Mock data
  const film1: FilmModel ={
    avatar: 'https://upload.wikimedia.org/wikipedia/vi/d/df/Arrival%2C_Movie_Poster.jpg',
    note: 'dump note 1',
    createDate: new Date(),
    name: 'dump name 1',
    rate: 9,
    type: 'dump type 1',
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
  const phims$ = new Observable<FilmModel[]>(o => {
    o.next(phimhots)
  });


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmListComponent, FilmListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign filmCategory as phim bo moi as default', () => {
    const filmCategory = component.filmCategory;
    expect(filmCategory).toBe('Phim bộ mới');
    expect(el.query(By.css('h3')).nativeElement.textContent.trim()).toBe('Phim bộ mới');
  });

  it('should render each film in every film-list-item component', () => {
    //Pass fake async data
    component.films$ = phims$;
    fixture.detectChanges();
    const filmItems = el.queryAll(By.css('app-film-list-item'));
    expect(filmItems.length).toBe(2);
  });

});
