import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyComponent } from './quan-ly.component';
import { FilmService } from '../share/film.service';
import { MatDialog } from '@angular/material/dialog';
import { FilmModel } from '../share/film.model';
import { Observable, of, Subject } from 'rxjs';
import { ShareModule } from '../share/share.module';
import { AppModule } from '../app.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { QuanLyModule } from './quan-ly.module';
import { By } from '@angular/platform-browser';

describe('QuanLyComponent', () => {
  let component: QuanLyComponent;
  let fixture: ComponentFixture<QuanLyComponent>;
  const film1: FilmModel = {
    avatar:
      'https://upload.wikimedia.org/wikipedia/vi/d/df/Arrival%2C_Movie_Poster.jpg',
    note: 'dump note',
    createDate: new Date(),
    name: 'dump name',
    rate: 9,
    type: 'dump type',
  } as FilmModel;
  const film2: FilmModel = {
    avatar:
      'https://upload.wikimedia.org/wikipedia/vi/d/df/Arrival%2C_Movie_Poster.jpg',
    note: 'dump note 2',
    createDate: new Date(),
    name: 'dump name 2',
    rate: 9,
    type: 'dump type 2',
  } as FilmModel;
  const phimlist: FilmModel[] = [film1, film2];
  const phimhots: FilmModel[] = [film2, film1];

  let filmService: FilmService;
  // = {
  //   filmsChanged: new Subject<FilmModel[]>(),

  //   getQuanLys$() {
  //     this.filmsChanged.next(phimlist);
  //     return new Observable<FilmModel[]>((o) => {
  //       o.next(phimhots);
  //     });
  //   },

  //   getQuanLys() {
  //     return phimlist;
  //   },
  // };

  const dialogRefStub = {
    afterClosed(): Observable<FilmModel[]> {
      return new Observable<FilmModel[]>((o) => {
        o.next(null);
      });
    },
    close() {
      return of(false);
    },
    films: new Observable<FilmModel[]>((o) => {
      o.next(null);
    }),
    isOpen: new Observable<boolean>((o) => {
      o.next(true);
    }),
  };

  const dialogStub = {
    open: () => dialogRefStub,
  };

  beforeEach(() => {
    filmService = jasmine.createSpyObj(
      'FilmService',
      ['getQuanLys$', 'getQuanLys'],
      {
        filmsChanged: new Subject<FilmModel[]>(),
      }
    );
    (filmService.getQuanLys$ as jasmine.Spy).and.returnValue(
      new Observable<FilmModel[]>((o) => {
        o.next(phimhots);
      })
    );

    TestBed.configureTestingModule({
      imports: [ShareModule, AppModule, MatFormFieldModule, QuanLyModule],
      declarations: [QuanLyComponent],
      providers: [
        { provide: FilmService, useValue: filmService },
        { provide: MatDialog, useValue: dialogStub },
      ],
      //schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(QuanLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return filmlist onInit', () => {
    component.ngOnInit();
    fixture.detectChanges();
    //filmService.filmsChanged.next(phimlist);
    expect(component.quanlys).toEqual(phimlist);
    const tableElement = fixture.debugElement.query(By.css('table'));
    console.log(tableElement);
  });

  it('should call matDialog.open when onAdd trigger', () => {
    spyOn(component.matDialog, 'open');
    component.ngOnInit();
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('#btn-Them'));
    buttonElement.triggerEventHandler('click', null);

    expect(component.matDialog.open).toHaveBeenCalled();
  });

  it('should call matDialog.open when onUpdate trigger', () => {
    spyOn(component.matDialog, 'open');
    component.onUpdate(1);
    expect(component.matDialog.open).toHaveBeenCalled();
  });

  it('should call matDialog.open when onDel trigger', () => {
    spyOn(component.matDialog, 'open');
    component.onDel(1);
    expect(component.matDialog.open).toHaveBeenCalled();
  });
});
