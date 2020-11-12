import { IEmployee } from "./models";

interface IEmployeeService {
  getList: () => Promise<IEmployee[]>;
}

function EmployeeServiceFactory(): IEmployeeService {
  return {
    getList: async () => {
      const response = await fetch("/employee");
      const body = await response.json();
      return body;
    },
  };
}

export const employeeService = EmployeeServiceFactory();
