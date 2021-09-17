import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FilmService} from "../../share/film.service";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {DelFilmConfirmComponent} from "./del-film-confirm.component";

describe('AddDialogComponent', () => {
  let component: DelFilmConfirmComponent;
  let fixture: ComponentFixture<DelFilmConfirmComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, RouterTestingModule],
      providers: [{
        provide: MatDialogRef,
        useValue: mockDialogRef
      },{ provide: MAT_DIALOG_DATA, useValue: {} },
        FilmService,
        HttpClient,
        HttpHandler
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
