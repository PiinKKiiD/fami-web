import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmHotListComponent } from './film-hot-list.component';

describe('FilmHotListComponent', () => {
  let component: FilmHotListComponent;
  let fixture: ComponentFixture<FilmHotListComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmHotListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmHotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
