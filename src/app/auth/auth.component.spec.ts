import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {FormsModule, NgForm} from "@angular/forms";
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LoadingSpinnerComponent } from '../share/loading-spinner/loading-spinner.component';
import { AlertComponent } from '../share/alert/alert.component';



describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let el: DebugElement;
  //create fake data
  const email = 'testemail@tmail.com';
  const userId = 'testUserId';
  const token = 'testToken';
  let mockResponse = {
    email : email,
    idToken : token,
    refreshToken : token + 'refresh',
    expiresIn : '30',
    localId : userId
  } as AuthResponseData;

  const router = {
    navigate: jasmine.createSpy('navigate')
  }

  const authService = {
    signin(email, password){
      mockResponse.email = email;
      mockResponse.idToken = 'signin';
      return new Observable( o =>{
        o.next(mockResponse);
      });
    },
    signup(email, password){
      mockResponse.email = email;
      mockResponse.idToken = 'signup';
      return new Observable( o =>{
        o.next(mockResponse);
      });
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule ],
      providers: [
        {provide: AuthService, useValue: authService},
        {provide: Router, useValue: router}],
      declarations: [ AuthComponent, LoadingSpinnerComponent, AlertComponent, ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.error).toBeNull();
  });

  describe('check global variable', () => {
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
  })

  describe('check onSubmit form', () =>{

    it('should navigate when user in isLogin mode with valid form', ()=>{
      let testForm = <NgForm>{
        value: {
            email: "Hello@gmail.com",
            password: "World123"
        },
        valid: true,
        reset(){
          this.value.email = '',
          this.value.password = ''
        }
      };
      component.isLoginMode = true;
      component.onSubmit(testForm);
      expect(router.navigate).toHaveBeenCalledWith(['/phim-moi']);
    })
    it('should navigate when user is not in isLogin mode with valid form', ()=>{
      let testForm = <NgForm>{
        value: {
            email: "Hello@gmail.com",
            password: "World123"
        },
        valid: true,
        reset(){
          this.value.email = '',
          this.value.password = ''
        }
      };
      component.isLoginMode = false;
      component.onSubmit(testForm);
      expect(router.navigate).toHaveBeenCalledWith(['/phim-moi']);
    })

    it('should not navigate when user in isLogin mode with invalid form', fakeAsync(()=>{
      let testFormFalse = <NgForm>{
        value: {
            email: "Hello@gmail.com",
            password: "World123"
        },
        valid: false,
        reset(){
          this.value.email = '',
          this.value.password = ''
        }
      };
      //before go into onsubmit, the valid of form is true, have not yet know why

      component.isLoginMode = true;
      console.log('right before onSubmit 1');
      component.onSubmit(testFormFalse);
      flush();
      console.log('right before expect 3');
      expect(router.navigate).not.toHaveBeenCalledWith(['/phim-moi']);

      console.log('after expect 4');
    }))


  })

  describe('check whether the template displays correctly', () => {
    it('should display loading Component when isLoading is true', () => {
      component.isLoading = true;
      fixture.detectChanges();
      const loadingComp = el.query(By.css('app-loading-spinner'));
      expect(loadingComp).toBeTruthy();
    });
    it('should display Error alert Component when error is not null', () => {
      component.error = 'this is error for testing';
      fixture.detectChanges();
      const errorComp = el.query(By.css('app-alert'));
      expect(errorComp).toBeTruthy();
    });

    it('should trigger function onSubmit when clicking btn submit', waitForAsync(() => {
      spyOn(component, 'onSubmit');
      const submitBtn = el.query(By.css('#submit-btn'));
      submitBtn.triggerEventHandler('click', null);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.onSubmit).toHaveBeenCalled();
      });
    }));

    it('should trigger function switch when clicking btn switch', waitForAsync(() => {
      // const componentInstance = jasmine.createSpyObj('AuthComponent', ['onSubmit', 'onSwitchMode']);
      spyOn(component, 'onSwitchMode');
      const switchBtn = el.query(By.css('#switch-btn'));
      switchBtn.triggerEventHandler('click', null);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.onSwitchMode).toHaveBeenCalled();
      });
    }));



  });
})


