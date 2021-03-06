import { environment } from 'src/environments/environment';
import { ApiEndpointsConstants } from './../constants/api-endpoints.constants';
import { ApiEndpointHelper } from './api-endpoint.helper';

fdescribe('ApiEndpointHelper', () => {
  let service: ApiEndpointHelper;
  let apiUrl: string;

  beforeEach(() => {
    service = new ApiEndpointHelper();
    apiUrl = environment.apiUrl;
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should be endpoint', () => {
    const url = `${apiUrl}${ApiEndpointsConstants.AUTH_SIGN_IN}`;

    expect(ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_SIGN_IN)).toBe(url);
  });
});
