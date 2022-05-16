import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppComponent } from './app.component';

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    const toastrServiceStub = () => ({ error: (errorMessage: string) => ({}) });
    const storeStub = () => ({
      select: () => ({ pipe: () => ({ subscribe: (f:any) => f({}) }) }),
      dispatch: () => ({})
    });
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: ToastrService, useFactory: toastrServiceStub },
        { provide: Store, useFactory: storeStub }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`title has default value`, () => {
    expect(component.title).toEqual(`Angular-Material-NgRx`);
  });
});
