import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {AuthResponseData, AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {PlaceholderDirective} from "../share/Placeholder/placeholder.directive";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoading= false;
  error: string= null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router:Router,
  ) {}

  onSwitchMode(){
    this.isLoginMode =!this.isLoginMode;
  }
  onSubmit(authForm: NgForm){
    if(!authForm.valid){
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.signin(email, password);
    }
    else{
      authObs =  this.authService.signup(email,password);
    }
    authObs.subscribe(resData =>{
      console.log('...',resData);
      this.isLoading = false;
      this.router.navigate(['/phim-moi']);
    }, erMessage => {
      console.log(erMessage);
      this.isLoading = false;
      this.error= erMessage;

    });
    authForm.reset()
  }

  onHandleError(){
    this.error = null;
  }

/*  private showErrorAlert(message: string ){
    //const alertComp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() =>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }*/

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }


}
