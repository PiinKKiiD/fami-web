import { query } from '@angular/animations';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AlertComponent } from './alert.component';


describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let el: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show massge <dump Messange> when <dump Message> is passed to Input', () => {
    component.message = 'dump Messange';
    fixture.detectChanges();
    const mess = el.query(By.css('p'));
    expect(mess.nativeElement.textContent.trim()).toContain('dump Messange');
  })

  it('should call onClose function when btn is clicked', () => {
    const button = el.query(By.css('button'));
    spyOn(component, 'onClose');
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.onClose).toHaveBeenCalled();
  })

  it('should emit nothing when onClose is called', fakeAsync(() => {
    component.onClose();
    flush();
    component.close.subscribe( res => {
      expect(res).toBeNull();
    })
  }))
});

