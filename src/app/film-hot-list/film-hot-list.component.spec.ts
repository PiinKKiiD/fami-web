import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FilmHotListComponent } from './film-hot-list.component';

describe('FilmHotListComponent', () => {
  let component: FilmHotListComponent;
  let fixture: ComponentFixture<FilmHotListComponent>;
  let el: DebugElement;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmHotListComponent ]
    })
    .compileComponents()
    .then(()=>{
      fixture = TestBed.createComponent(FilmHotListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
