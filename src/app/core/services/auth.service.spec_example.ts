import { ApiEndpointsConstants } from "../constants/api-endpoints.constants";
import { environment } from "src/environments/environment";
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from "@angular/common/http/testing";
import { fakeAsync, getTestBed, TestBed, tick } from "@angular/core/testing";
import { defer, Observable, of, throwError } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { RequestSignInModel, ResponseSignInModel } from "src/app/shared/models/auth/sign-in";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ApiEndpointHelper } from "../helpers/api-endpoint.helper";

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

fdescribe("AuthService", () => {
  let service: jasmine.SpyObj<AuthService>;
  let httpController: HttpTestingController;
  let injector: TestBed;
  let httpClient: HttpClient;
  let spy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    spy = jasmine.createSpyObj("HttpClient", ["get", "post"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("AuthService > signIn ", () => {
    const model: RequestSignInModel = {
      login: "test",
      password: "123123123",
    };

    it("should be created signIn", () => {
      expect(service.signIn).toBeTruthy();
    });

    it("should return accessToken", (done: DoneFn) => {
      let response: ResponseSignInModel = {
        accessToken: "Mock token",
      };

      service.signIn(model).subscribe({
        next: (res) => {
          console.log(res);
          expect(res).withContext("service returned accessToken").toEqual(response);
        },
        error: fail,
      });

      const req: TestRequest = httpController.expectOne(
        ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_SIGN_IN)
      );

      expect(req.request.method).toEqual("POST");

      req.flush(response);
      done();
    });

    it("should return Error 404", (done: DoneFn) => {
      const errorResponse = new HttpErrorResponse({
        error: "test 404 error",
        status: 404,
        statusText: "Not Found",
      });
      function asyncError<T>(errorObject: any) {
        return defer(() => Promise.reject(errorObject));
      }

      spy.post.and.returnValue(asyncError(errorResponse));

      service.signIn({} as RequestSignInModel).subscribe({
        next: () => {},
        error: (res) => {
          debugger;
          expect(res).withContext("service returned error").toEqual({});
        },
      });

      const req: TestRequest = httpController.expectOne(
        ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_SIGN_IN)
      );

      expect(req.request.method).toEqual("POST");

      req.flush(errorResponse);
      done();
    });
  });
});
