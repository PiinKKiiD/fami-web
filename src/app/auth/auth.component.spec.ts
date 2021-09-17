import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {RouterTestingModule} from "@angular/router/testing";
import {FilmService} from "../share/film.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {FormsModule, NgForm} from "@angular/forms";
import {ViewChild} from "@angular/core";



describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authForm: NgForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule,],
      providers: [FilmService, HttpClient, HttpHandler],
      declarations: [ AuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle is LogginMode whenever click onSwitchMode',()=>{
    component.onSwitchMode();
    const mode = component.isLoginMode;
    expect(mode).toBeFalse();
  });

  it('should toggle is LogginMode whenever click onSwitchMode',()=>{
    component.isLoginMode = false;
    component.onSwitchMode();
    const mode = component.isLoginMode;
    expect(mode).toBeTruthy();
  });

});

