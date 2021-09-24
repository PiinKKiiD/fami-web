import { AuthResponseData, AuthService } from "./auth.service";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { fakeAsync, flush, TestBed} from "@angular/core/testing";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { User } from "./user.model";

describe('Auth Service', ()=>{
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  const router = {
    navigate: jasmine.createSpy('navigate')
  }

  //create fake data
  const email = 'testemail@tmail.com';
  const userId = 'testUserId';
  const token = 'testToken';
  const expiresIn = 30;
  const password = 'dumppassword';
  const mockResponse = {
    email : email,
    idToken : token,
    refreshToken : token + 'refresh',
    expiresIn : '30',
    localId : userId
  } as AuthResponseData;

  const dumpUser = new User(
    email,
    userId,
    token,
    new Date(new Date().getTime() + expiresIn*1000)
  );

    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const dataErr = 'Invalid request parameters';
  /////////////////////////


  beforeEach(()=>{

    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        {provide: Router, useValue: router}
      ]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController= TestBed.inject(HttpTestingController);
  });

  describe('handleAuthentication',()=>{
    it('should create new user',()=>{
      authService.signup(email,password).subscribe((authResponseData: AuthResponseData) => {
        console.log(authResponseData);
      });

      const req =  httpTestingController.expectOne(environment.firebaseAPISignup+environment.firebaseAPIKey);
      expect(req.request.method).toEqual('POST');
      req.flush(mockResponse);
      expect(authService.user).not.toBe(null);
      authService.user.subscribe(user =>{
        expect(user.email).toEqual(email);
      })
    })

    it('should logout', () => {
      authService.user.next(dumpUser);
      authService.logout();
      expect(router.navigate).toHaveBeenCalledWith(['/auth']);
      authService.user.subscribe(user => {expect(user).toBeNull()});
    });

    it('should sign in', () =>{
      authService.signin(email, password).subscribe(resDara =>{
        console.log(resDara);
      });
      const req =  httpTestingController.expectOne(environment.firebaseAPISignin+environment.firebaseAPIKey);
      expect(req.request.method).toEqual('POST');
      req.flush(mockResponse);
      expect(authService.user).not.toBe(null);
      authService.user.subscribe(user =>{
        expect(user.email).toEqual(email);
      })
    });

  });

  describe('handle autoLogin autoLogout', () => {
    it('should create new User along with new expireIn when localStorage contains an user ',()=>{
      //create data for localStrage
      localStorage.setItem('userData',JSON.stringify(dumpUser));
      authService.autoLogin();
      authService.user.subscribe(newUser => {
        expect(newUser).not.toBe(dumpUser);
      })
    });
    it('should not create new user when the localUser is null',() => {
      localStorage.removeItem('userData');
      authService.autoLogin();
      authService.user.subscribe(newUser => {
        console.log(newUser);
        expect(newUser).toBeNull();
      })
    });

    it('should logout when the expiresIn is empty', fakeAsync(() =>{
      authService.user.next(dumpUser);
      console.log('expect run this first');
      authService.autoLogout(1000);
      flush();
      console.log('expect run this 2nd');
      expect(router.navigate).toHaveBeenCalledWith(['/auth']);
      authService.user.subscribe(user => {expect(user).toBeNull()});
      console.log('expect run this 3rd');
    }));

  });
});
