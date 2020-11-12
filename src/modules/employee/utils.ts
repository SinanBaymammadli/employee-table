import { includes } from "../../utils";
import { IEmployee, IEmployeeFilter } from "./models";

export function filterEmployeeList(
  employeeList: IEmployee[],
  { name, surname, position, phoneNumber, dateOfBirth }: IEmployeeFilter
): IEmployee[] {
  let list = employeeList;

  if (name) {
    list = list.filter((l) => includes(l.name, name));
  }

  if (surname) {
    list = list.filter((l) => includes(l.surname, surname));
  }

  if (position) {
    list = list.filter((l) => includes(l.position, position));
  }

  if (phoneNumber) {
    list = list.filter((l) => includes(l.phoneNumber, phoneNumber));
  }

  if (dateOfBirth) {
    list = list.filter((l) => includes(l.dateOfBirth, dateOfBirth));
  }

  return list;
}
