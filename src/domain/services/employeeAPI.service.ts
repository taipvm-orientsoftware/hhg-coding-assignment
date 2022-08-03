import { IGetWithPaginationRequest } from '../dtos/getWithPaginationRequest.dto';
import BaseApiService from './baseAPI.service';

export default class EmployeeApiService extends BaseApiService {
  public baseUrl: string = '/employees';

  public getEmployeesWithPagination(params: IGetWithPaginationRequest) {
    return this.getWithPagination(this.baseUrl, params);
  }
}
