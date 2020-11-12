import "@testing-library/jest-dom";
import React from "react";
import { server } from "./mocks/server";
import { Router } from "react-router-dom";
import { ReactQueryConfigProvider } from "react-query";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

export const renderWithRouter = (
  ui: React.ReactElement,
  { route = "/", history = createMemoryHistory({ initialEntries: [route] }) }: { route?: string; history?: any } = {}
) => {
  const Wrapper = ({ children }: { children?: React.ReactNode }) => (
    <ReactQueryConfigProvider
      config={{
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      }}
    >
      <Router history={history}>{children}</Router>
    </ReactQueryConfigProvider>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
};

export * from "@testing-library/react";
export { renderWithRouter as render };
