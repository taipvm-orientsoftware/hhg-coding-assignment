export interface IEmployee {
  id: number;
  name: string;
  email: string;
  position: string;
}

export interface IAddEmployeeData {
  name: string;
  email: string;
  position: string;
}

export interface IGetEmployeesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: string;
}
