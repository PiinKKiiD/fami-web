import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FilmService} from "../../share/film.service";
import {DelFilmConfirmComponent} from "./del-film-confirm.component";
import { FilmModel } from 'src/app/share/film.model';
import { Observable, Subject } from 'rxjs';
import { QuanLyModule } from '../quan-ly.module';

describe('DelFilmDialogComponent', () => {
  let component: DelFilmConfirmComponent;
  let fixture: ComponentFixture<DelFilmConfirmComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const filmService = {
    filmsChanged: new Subject<FilmModel[]>(),
    delFilmFromQuanLy(id: number){
      return new Observable<any>( o => {o.next('deleting')});
    }

    // getPhimLeHots$(){
    //   return new Observable<FilmModel[]>( o => {o.next(phimhots); }); }
    // ,
    // getPhimLes$(){
    //   return new Observable<FilmModel[]>( o => {o.next(phimlist)} ); }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanLyModule],
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

  it('should call dialofRef.close() when onCancel is trggered', () => {
    component.onCancel();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should call filmService.DelFilmFromQuanLy(this.index) when onSubmit is triggered', fakeAsync(() => {
    component.onDelete();
    flush();
    expect(component.dialogRef.close).toHaveBeenCalled();
  }))




});
