import { rest } from "msw";
import { IEmployee } from "./models";

export const employeeData: IEmployee[] = [
  {
    id: "1",
    name: "Username1",
    surname: "Usersurname1",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
  {
    id: "2",
    name: "Username2",
    surname: "Usersurname2",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
  {
    id: "3",
    name: "Username3",
    surname: "Usersurname3",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
  {
    id: "4",
    name: "Username4",
    surname: "Usersurname4",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
  {
    id: "5",
    name: "Username5",
    surname: "Usersurname5",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
  {
    id: "6",
    name: "Username6",
    surname: "Usersurname6",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
  {
    id: "7",
    name: "Username7",
    surname: "Usersurname7",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
  {
    id: "8",
    name: "Username8",
    surname: "Usersurname8",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
  {
    id: "9",
    name: "Username9",
    surname: "Usersurname9",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
  {
    id: "10",
    name: "Username10",
    surname: "Usersurname10",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
  {
    id: "11",
    name: "Username11",
    surname: "Usersurname11",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
  {
    id: "12",
    name: "Username12",
    surname: "Usersurname12",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
  {
    id: "13",
    name: "Username13",
    surname: "Usersurname13",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
  {
    id: "14",
    name: "Username14",
    surname: "Usersurname14",
    position: "Specialist",
    phoneNumber: "051-222-22-22",
    dateOfBirth: "11-12-1990",
  },
];

function sleep(ms = 3000) {
  return new Promise((res) => setTimeout(() => res(), ms));
}

export const mockHandlers = [
  rest.get("/employee", async (req, res, ctx) => {
    await sleep();
    return res(ctx.status(200), ctx.json(employeeData));
  }),
];
