import { AuthService } from "./auth.service";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";

describe('Auth Service', ()=>{
  let authService: AuthService,
      httpTestingController: HttpTestingController;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
        AuthService
      ]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController= TestBed.inject(HttpTestingController);
  });

  it('should call handleAuthentication when singup', ()=>{
    //Prepare test data
    pending();

    //Trigger event

    //Define what we expect
  })

})
