import { TestBed } from "@angular/core/testing";
import { LocalStorageHelper, LocalStorageTokenData } from "./local-storage.helper";

fdescribe("LocalStorageHelper", () => {
  let service: LocalStorageHelper;
  const tokenModel: LocalStorageTokenData = {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LocalStorageHelper] });
    service = TestBed.inject(LocalStorageHelper);
  });

  afterEach(() => {
    service.removeLocalStorageToken();
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });

  it("should be set token data", () => {
    const tokenModel: LocalStorageTokenData = {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };

    service.setLocalStorageToken = tokenModel;

    expect(service.getLocalStorageToken).not.toBeUndefined();
    expect(service.getLocalStorageToken).toEqual(tokenModel);
    expect(service.getLocalStorageToken?.accessToken).toBe(tokenModel.accessToken);
    expect(service.getLocalStorageToken?.refreshToken).toBe(tokenModel.refreshToken);
  });

  it("should be set accessToken", () => {
    service.setLocalStorageToken = tokenModel;

    expect(service.getLocalStorageToken).toEqual(tokenModel);
    expect(service.getLocalStorageToken?.accessToken).toBe(tokenModel.accessToken);
    expect(service.getLocalStorageToken?.accessToken).toBeDefined();
    expect(service.getLocalStorageToken?.refreshToken).toBe(tokenModel.refreshToken);
  });

  it("should be remove token data", () => {
    service.removeLocalStorageToken();
    const getTokenData = service.getLocalStorageToken;

    expect(getTokenData).not.toEqual(tokenModel);
    expect(getTokenData).toBeUndefined();
  });
});
