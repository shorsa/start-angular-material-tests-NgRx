import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesConstants } from 'src/app/core/constants/routes.constants';
import { routes } from 'src/app/modules/auth/auth-routing.module';
import { NavigationHelper } from './navigation.helper';

fdescribe('NavigationHelper', () => {
  let service: NavigationHelper;
  // let location: Location;
  let router: Router;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array: any) => ({}) });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        NavigationHelper,
        { provide: Router, useFactory: routerStub },
      ],
    });
    service = TestBed.inject(NavigationHelper);
    // location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.stub();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should be route auth without route params', () => {
    service.toAuth();
    expect(router.navigate).toHaveBeenCalledWith([RoutesConstants.AUTH_INDEX]);
  });

  it('should be route auth without route params', () => {
    service.toAuth(RoutesConstants.SIGN_IN);
    expect(router.navigate).toHaveBeenCalledWith([
      RoutesConstants.AUTH_INDEX,
      RoutesConstants.SIGN_IN,
    ]);
  });
});
