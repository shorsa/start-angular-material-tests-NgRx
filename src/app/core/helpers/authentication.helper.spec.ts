import { TestBed } from '@angular/core/testing';
import { AuthenticationHelper } from './authentication.helper';
import { LocalStorageHelper, LocalStorageTokenData } from './local-storage.helper';
import { NavigationHelper } from './navigation.helper';

fdescribe('AuthenticationHelper', () => {
  let service: AuthenticationHelper;
  const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidXNlckB1c2VyLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.IKVGeNnKdnU8OI8gVowAz7AOHnsHCsXVaQt-cpPYg6A';

  const INVALID_ACCESS_TOKEN = 'invalid';

  const tokenUserId = '1';
  const tokenUserEmail = 'user@user.com';
  const tokenUserName = 'User';
  const tokenUserRole = 'Admin';

  const localStorageModel: LocalStorageTokenData = {
    accessToken: ACCESS_TOKEN,
    refreshToken: 'refreshToken',
  };
  let localStorageHelperStub: any;
  let localStore: { [key: string]: any } = {};

  beforeEach(() => {
    localStorageHelperStub = () => ({
      getLocalStorageToken: undefined,
      setLocalStorageToken: (key: string, data: string) => (localStore[key] = data),
      removeLocalStorageToken: () => ({}),
    });

    const navigationHelperStub = () => ({ toAuth: () => ({}) });
    TestBed.configureTestingModule({
      providers: [
        AuthenticationHelper,
        { provide: LocalStorageHelper, useFactory: localStorageHelperStub },
        { provide: NavigationHelper, useFactory: navigationHelperStub },
      ],
    });

    service = TestBed.inject(AuthenticationHelper);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('loginSuccess', () => {
    it('should be authorization', () => {
      expect(service.loginSuccess).toBeFalse();

      service.signIn(localStorageModel);
      expect(service.loginSuccess).toBeTrue();
    });

    it('should be not authorization', () => {
      service.signOut();
      expect(service.loginSuccess).toBeFalse();
    });
  });

  describe('isAuthenticated', () => {
    it('should be not authorization (promise)', async () => {
      await service.signOut();

      let isAuthenticated = await service.isAuthenticated();

      await expect(isAuthenticated).toBeFalse();
    });

    it('should be authorization (promise)', async () => {
      service.signIn(localStorageModel);

      let isAuthenticated = await service.isAuthenticated();

      expect(isAuthenticated).toBeTrue();
    });
  });

  describe('setTokens', () => {
    it('should be accessToken equal localStorageModal.accessToken', () => {
      expect(service.getAccessToken()).toBeUndefined();
      service.setTokens(localStorageModel);
      expect(service.getAccessToken()).toBe(localStorageModel.accessToken);
    });

    it('should be refreshToken equal localStorageModal.refreshToken', () => {
      expect(service.getRefreshToken()).toBeUndefined();
      service.setTokens(localStorageModel);
      expect(service.getRefreshToken()).toBe(localStorageModel.refreshToken);
    });
  });

  describe('signOut', () => {
    it('makes expected calls', () => {
      const localStorageHelperStub: LocalStorageHelper =
        TestBed.inject(LocalStorageHelper);
      const navigationHelperStub: NavigationHelper = TestBed.inject(NavigationHelper);

      spyOn(localStorageHelperStub, 'removeLocalStorageToken').and.callThrough();
      spyOn(navigationHelperStub, 'toAuth').and.callThrough();

      service.signOut();

      expect(localStorageHelperStub.removeLocalStorageToken).toHaveBeenCalled();
      expect(navigationHelperStub.toAuth).toHaveBeenCalled();
    });
  });

  describe('getUserId', () => {
    it('should be null', () => {
      const userId = service.getUserId();
      expect(userId).toBeNull();
    });

    it('should be userId', () => {
      service.setTokens(localStorageModel);
      const userId = service.getUserId();
      expect(userId).not.toBeNull();
      expect(userId).toBe(tokenUserId);
    });

    it('should be null', () => {
      const invalidModel = {
        ...localStorageModel,
        accessToken: INVALID_ACCESS_TOKEN,
      };
      service.setTokens(invalidModel);
      const userId = service.getUserId();
      expect(userId).toBeNull();
    });

    afterAll(() => {
      service.signOut();
    });
  });

  describe('getUserEmail', () => {
    it('should be null', () => {
      const userEmail = service.getUserEmail();
      expect(userEmail).toBeNull();
    });

    it('should be userId', () => {
      service.setTokens(localStorageModel);
      const userEmail = service.getUserEmail();
      expect(userEmail).not.toBeNull();
      expect(userEmail).toBe(tokenUserEmail);
    });

    it('should be null', () => {
      const invalidModel = {
        ...localStorageModel,
        accessToken: INVALID_ACCESS_TOKEN,
      };
      service.setTokens(invalidModel);
      const userEmail = service.getUserEmail();
      expect(userEmail).toBeNull();
    });

    afterAll(() => {
      service.signOut();
    });
  });

  describe('getUserName', () => {
    it('should be null', () => {
      const userName = service.getUserName();
      expect(userName).toBeNull();
    });

    it('should be userId', () => {
      service.setTokens(localStorageModel);
      const userName = service.getUserName();
      expect(userName).not.toBeNull();
      expect(userName).toBe(tokenUserName);
    });

    it('should be null', () => {
      const invalidModel = {
        ...localStorageModel,
        accessToken: INVALID_ACCESS_TOKEN,
      };
      service.setTokens(invalidModel);
      const userName = service.getUserName();
      expect(userName).toBeNull();
    });

    afterAll(() => {
      service.signOut();
    });
  });

  describe('getUserRole', () => {
    it('should be null', () => {
      const userRole = service.getUserRole();
      expect(userRole).toBeNull();
    });

    it('should be userId', () => {
      service.setTokens(localStorageModel);
      const userRole = service.getUserRole();
      expect(userRole).not.toBeNull();
      expect(userRole).toBe(tokenUserRole);
    });

    it('should be null', () => {
      const invalidModel = {
        ...localStorageModel,
        accessToken: INVALID_ACCESS_TOKEN,
      };
      service.setTokens(invalidModel);
      const userRole = service.getUserRole();
      expect(userRole).toBeNull();
    });

    afterAll(() => {
      service.signOut();
    });
  });

  // describe("getUserEmail", () => {
  //   it("makes expected calls", () => {
  //     spyOn(component, "getAccessToken").and.callThrough();
  //     service.getUserEmail();
  //     expect(service.getAccessToken).toHaveBeenCalled();
  //   });
  // });

  // describe("getUserName", () => {
  //   it("makes expected calls", () => {
  //     spyOn(component, "getAccessToken").and.callThrough();
  //     service.getUserName();
  //     expect(service.getAccessToken).toHaveBeenCalled();
  //   });
  // });

  // describe("getUserRole", () => {
  //   it("makes expected calls", () => {
  //     spyOn(component, "getAccessToken").and.callThrough();
  //     service.getUserRole();
  //     expect(service.getAccessToken).toHaveBeenCalled();
  //   });
  // });
});
