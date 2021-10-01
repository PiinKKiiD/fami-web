import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { FilmModel } from '../share/film.model';
import { FilmHotItemComponent } from './film-hot-item/film-hot-item.component';

import { FilmHotListComponent } from './film-hot-list.component';

describe('FilmHotListComponent', () => {
  let component: FilmHotListComponent;
  let fixture: ComponentFixture<FilmHotListComponent>;
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


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmHotListComponent, FilmHotItemComponent ]
    })
    .compileComponents()
    .then(()=>{
      fixture = TestBed.createComponent(FilmHotListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }));


  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should create a title in h3 tag as Phim hot',() => {
    const title = el.query(By.css('h3'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent.trim()).toContain('Phim hot');
  });

  it('should render each film in each FilmFotItemComponent', waitForAsync(() =>{
    component.filmhots$ = phims$;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const items = el.queryAll(By.css('app-film-hot-item'));
    expect(items.length).toBe(2);
    })

  }))
})
