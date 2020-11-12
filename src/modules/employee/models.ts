interface IEmployeeBase {
  name: string;
  surname: string;
  dateOfBirth: string;
  position: string;
  phoneNumber: string;
}

export interface IEmployee extends IEmployeeBase {
  id: string;
  deleted?: boolean;
}

export interface IEmployeeFilter extends Partial<IEmployeeBase> {
  page: number;
  count: number;
}

export interface IEmployeeForm {
  employees: IEmployee[];
}

export interface IEmployeeFormRequest {
  updated: IEmployee[];
  deleted: IEmployee[];
}
