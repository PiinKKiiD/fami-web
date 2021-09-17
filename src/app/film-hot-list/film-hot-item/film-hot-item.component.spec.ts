import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmHotItemComponent } from './film-hot-item.component';
import {FilmModel} from "../../share/film.model";


describe('FilmHotItemComponent', () => {
  let component: FilmHotItemComponent;
  let fixture: ComponentFixture<FilmHotItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmHotItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmHotItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return number of starts upon film rate 1',()=>{
    component.filmhot = new FilmModel('','',new Date(),'',0, '')
    const starts = component.getRate()
    expect(starts).toBe(1)
  })

  it('should return number of starts upon film rate 2',()=>{
    component.filmhot = new FilmModel('','',new Date(),'',21, '')
    const starts = component.getRate()
    expect(starts).toBe(2)
  })

  it('should return number of starts upon film rate 3',()=>{
    component.filmhot = new FilmModel('','',new Date(),'',41, '')
    const starts = component.getRate()
    expect(starts).toBe(3)
  })

  it('should return number of starts upon film rate 4',()=>{
    component.filmhot = new FilmModel('','',new Date(),'',61, '')
    const starts = component.getRate()
    expect(starts).toBe(4)
  })

  it('should return number of starts upon film rate 5',()=>{
    component.filmhot = new FilmModel('','',new Date(),'',81, '')
    const starts = component.getRate()
    expect(starts).toBe(5)
  })

});
