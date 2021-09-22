import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilmHotItemComponent } from './film-hot-item.component';
import {FilmModel} from "../../share/film.model";
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('FilmHotItemComponent', () => {
  let component: FilmHotItemComponent;
  let fixture: ComponentFixture<FilmHotItemComponent>;
  let el: DebugElement;
  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      declarations: [ FilmHotItemComponent ]
    })
    .compileComponents()
    .then(()=>{
      fixture = TestBed.createComponent(FilmHotItemComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return number of starts upon film rate 1',()=>{
    component.filmhot = new FilmModel('','',new Date(),'',0, '')
    const st = 1;
    const starts = component.getRate();
    fixture.detectChanges();
    expect(starts).toBe(st)
    const startDOMs = el.queryAll(By.css(".starts"));
    expect(startDOMs.length).toBe(st);
  })

  it('should return number of starts upon film rate 2',()=>{
    component.filmhot = new FilmModel('','',new Date(),'',21, '')
    const st = 2;
    const starts = component.getRate();
    fixture.detectChanges();
    expect(starts).toBe(st)
    const startDOMs = el.queryAll(By.css(".starts"));
    expect(startDOMs.length).toBe(st);
  })

  it('should return number of starts upon film rate 3',()=>{
    component.filmhot = new FilmModel('','',new Date(),'',41, '')
    const starts = component.getRate();
    const st = 3;
    fixture.detectChanges();
    expect(starts).toBe(st)
    const startDOMs = el.queryAll(By.css(".starts"));
    expect(startDOMs.length).toBe(st);
  })

  it('should return number of starts upon film rate 4',()=>{
    component.filmhot = new FilmModel('','',new Date(),'',61, '')
    const starts = component.getRate();
    const st = 4;
    fixture.detectChanges();
    expect(starts).toBe(st)
    const startDOMs = el.queryAll(By.css(".starts"));
    expect(startDOMs.length).toBe(st);
  })

  it('should return number of starts upon film rate 5',()=>{
    component.filmhot = new FilmModel('','',new Date(),'',81, '')
    const starts = component.getRate();
    const st = 5;
    fixture.detectChanges();
    expect(starts).toBe(st)
    const startDOMs = el.queryAll(By.css(".starts"));
    expect(startDOMs.length).toBe(st);
  })

});
