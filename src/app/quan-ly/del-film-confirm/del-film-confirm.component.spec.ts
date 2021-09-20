import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FilmService} from "../../share/film.service";
import {RouterTestingModule} from "@angular/router/testing";
import {DelFilmConfirmComponent} from "./del-film-confirm.component";
import { FilmModel } from 'src/app/share/film.model';
import { Subject } from 'rxjs';

describe('AddDialogComponent', () => {
  let component: DelFilmConfirmComponent;
  let fixture: ComponentFixture<DelFilmConfirmComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const filmService = {
    filmsChanged: new Subject<FilmModel[]>(),

    // getPhimLeHots$(){
    //   return new Observable<FilmModel[]>( o => {o.next(phimhots); }); }
    // ,
    // getPhimLes$(){
    //   return new Observable<FilmModel[]>( o => {o.next(phimlist)} ); }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, RouterTestingModule],
      providers: [{
        provide: MatDialogRef,
        useValue: mockDialogRef
      },{ provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: FilmService, useValue: filmService}
      ],
      declarations: [ DelFilmConfirmComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelFilmConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
