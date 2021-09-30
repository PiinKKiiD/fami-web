import { fakeAsync, flush, TestBed, tick} from "@angular/core/testing";
import { Router, RouterStateSnapshot } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";
import {routes} from "./app-routing.module"
import {Location} from '@angular/common';
import { AuthModule } from "./auth/auth.module";
import { QuanLyModule } from "./quan-ly/quan-ly.module";
import { AuthGuard } from "./auth/auth.guard";
import { BehaviorSubject } from "rxjs";
import { User } from "./auth/user.model";
import { AuthService } from "./auth/auth.service";


describe('App routing module', () => {
  let location: Location;
  let router: Router;
  let guard : AuthGuard;
  //create fake data
  const email = 'testemail@tmail.com';
  const userId = 'testUserId';
  const token = 'testToken';
  const expiresIn = 30;
  const password = 'dumppassword';
  // const mockResponse = {
  //   email : email,
  //   idToken : token,
  //   refreshToken : token + 'refresh',
  //   expiresIn : '30',
  //   localId : userId
  // } as AuthResponseData;

  const dumpUser = new User(
    email,
    userId,
    token,
    new Date(new Date().getTime() + expiresIn*1000)
  );
  const authService = {
     user : new BehaviorSubject<User>(null)
  }

  const createMockRoute = (id: string) => {
    return {
      params: { id: id }
    } as any;
  };
  const createMockRouteState = () => null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, AuthModule, QuanLyModule, RouterTestingModule.withRoutes(routes)],
      providers: [AuthGuard, {
        provide: AuthService, useValue: authService
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    guard = TestBed.inject(AuthGuard);
    router.initialNavigation();

  });

  it('should navigate to "" redirects you to /auth when the guard does not activate', fakeAsync(() => {
    authService.user.next(null);
    router.navigate(['']);
    tick(Infinity);
    expect(location.path()).toBe('/auth');
  }));

  it('should navigate to "" redirecting to /phim-moi when the guard activate ', fakeAsync(() => {
    authService.user.next(dumpUser);
    router.navigate(['']);
    tick(Infinity);
    expect(location.path()).toBe('/phim-moi');
  }));

  it('should render QuanLy component when navigate to "quan-ly" after pass the guard', fakeAsync(() => {
    authService.user.next(dumpUser);
    router.navigate(['quan-ly']);
    tick(Infinity);
    expect(location.path()).toBe('/quan-ly');
  }))


})
