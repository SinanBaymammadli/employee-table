import { setupWorker } from "msw";
import { mockHandlers as employeeMockHandlers } from "../modules/employee/mocks";

export const worker = setupWorker(...employeeMockHandlers);
