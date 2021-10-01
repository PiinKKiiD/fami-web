import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilmModel } from 'src/app/share/film.model';

import { FilmListItemComponent } from './film-list-item.component';

describe('FilmListItemComponent', () => {
  let component: FilmListItemComponent;
  let fixture: ComponentFixture<FilmListItemComponent>;
  let el: DebugElement;
  const film1: FilmModel ={
    avatar: 'https://upload.wikimedia.org/wikipedia/vi/d/df/Arrival%2C_Movie_Poster.jpg',
    note: 'dump note',
    createDate: new Date(),
    name: 'dump name',
    rate: 67,
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmListItemComponent);
    component = fixture.componentInstance;
    component.film = film1;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should defined', () => {
    expect(component).toBeDefined();
  });

  it('should return number of starts upon film rate 1',()=>{
    component.film = new FilmModel('','',new Date(),'',0, '')
    const st = 1;
    const stars = component.getRate();
    fixture.detectChanges();
    //expect(stars).toBe(st)
    const startDOMs = el.queryAll(By.css(".stars"));
    expect(startDOMs.length).toBe(st);
  })

  it('should return number of starts upon film rate 2',()=>{
    component.film = new FilmModel('','',new Date(),'',21, '')
    const st = 2;
    const stars = component.getRate();
    fixture.detectChanges();
    //expect(stars).toBe(st)
    const startDOMs = el.queryAll(By.css(".stars"));
    expect(startDOMs.length).toBe(st);
  })

  it('should return number of starts upon film rate 3',()=>{
    component.film = new FilmModel('','',new Date(),'',41, '')
    const stars = component.getRate();
    const st = 3;
    fixture.detectChanges();
    //expect(stars).toBe(st)
    const startDOMs = el.queryAll(By.css(".stars"));
    expect(startDOMs.length).toBe(st);
  })

  it('should return number of starts upon film rate 4',()=>{
    component.film = new FilmModel('','',new Date(),'',61, '')
    const stars = component.getRate();
    const st = 4;
    fixture.detectChanges();
    //expect(stars).toBe(st)
    const startDOMs = el.queryAll(By.css(".stars"));
    expect(startDOMs.length).toBe(st);
  })

  it('should return number of starts upon film rate 5',()=>{
    component.film = new FilmModel('','',new Date(),'',81, '')
    const starts = component.getRate();
    const st = 5;
    fixture.detectChanges();
    expect(starts).toBe(st)
    const startDOMs = el.queryAll(By.css(".stars"));
    expect(startDOMs.length).toBe(st);
  })


});
