import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogComponent } from './add-dialog.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FilmService} from "../../share/film.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable, Subject} from "rxjs";
import {FilmModel} from "../../share/film.model";
import {DataStorageService} from "../../share/data-storage.service";

describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const datatStorageService ={
  };

  const filmService = {
    filmsChanged: new Subject<FilmModel[]>(),

    addFilmToQuanLy(newFilm: FilmModel){

    }
    ,
    getFilms(type: string){
      return [];
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, RouterTestingModule],
      providers: [{
        provide: MatDialogRef,
        useValue: mockDialogRef
      },
        {provide: FilmService, useValue: filmService},
        {provide: DataStorageService, useValue: datatStorageService}
      ],
      declarations: [ AddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
