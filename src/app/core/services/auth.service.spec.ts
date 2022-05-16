import { HttpErrorResponse } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RequestSignInModel, ResponseSignInModel } from "src/app/shared/models/auth/sign-in";
import { ApiEndpointsConstants } from "../constants";
import { ApiEndpointHelper } from "../helpers/api-endpoint.helper";
import { AuthService } from "./auth.service";

fdescribe("AuthService", () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  const requestSignInModel: RequestSignInModel = {
    login: "login",
    password: "123123",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });

  describe("signIn", () => {
    it("should return accessToken", () => {
      const responseSignInModelStub: ResponseSignInModel = {
        accessToken: "token",
      };

      service.signIn(requestSignInModel).subscribe({
        next: (res) => {
          expect(res).toEqual(responseSignInModelStub);
        },
        error: (error) => {
          expect(error).toBeFalsy();
        },
      });

      const req: TestRequest = httpTestingController.expectOne(
        ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_SIGN_IN)
      );

      expect(req.request.method).toEqual("POST");
      req.flush(responseSignInModelStub);
    });

    it("should return error", () => {
      const errorResponse = new HttpErrorResponse({
        status: 404,
        statusText: "Not Found",
      });

      service.signIn(requestSignInModel).subscribe({
        next: () => {
          fail();
        },
        error: (error: HttpErrorResponse) => {
          expect(error.statusText).toBe(errorResponse.statusText);
          expect(error.status).toBe(errorResponse.status);
          expect(error.url).toBe(req.request.url);
        },
      });
      const req: TestRequest = httpTestingController.expectOne(
        ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_SIGN_IN)
      );

      expect(req.request.method).toEqual("POST");

      req.flush(requestSignInModel, errorResponse);
    });

    afterEach(() => {
      httpTestingController.verify();
    });
  });
});
