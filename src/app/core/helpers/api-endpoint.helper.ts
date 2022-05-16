import { environment } from "src/environments/environment";

export class ApiEndpointHelper {
  static get(methodName: string): string {
    return `${environment.apiUrl}${methodName}`;
  }
}
