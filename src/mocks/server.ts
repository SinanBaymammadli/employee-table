import { setupServer } from "msw/node";
import { mockHandlers as employeeMockHandlers } from "../modules/employee/mocks";

export const server = setupServer(...employeeMockHandlers);
