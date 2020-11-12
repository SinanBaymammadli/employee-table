import React from "react";
import { fireEvent, render, screen, waitFor } from "../../setupTests";
import { EmployeeTable } from "./EmployeeTable";
import { employeeData } from "./mocks";

const mockSubmit = jest.fn();

const renderEmployeeTable = () =>
  render(<EmployeeTable initialValues={{ employees: employeeData }} onSubmit={mockSubmit} />);

const getFirstDeleteButton = async () => {
  const deleteButtons = await screen.findAllByText(/delete/i);
  return deleteButtons[0];
};

const getSubmitButton = () => {
  return screen.getByText(/save/i);
};

const getResetButton = () => {
  return screen.getByText(/reset/i);
};

const getNameInput = async () => {
  const nameInputs = await screen.findAllByPlaceholderText(/name/i);
  return nameInputs[1];
};

const getSurnameInput = async () => {
  const nameInputs = await screen.findAllByPlaceholderText(/surname/i);
  return nameInputs[1];
};

test("Marks row as deleted when clicking delete button", async () => {
  renderEmployeeTable();
  const deleteButton = await getFirstDeleteButton();

  fireEvent.click(deleteButton);
  const submitButton = getSubmitButton();
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockSubmit).toBeCalledWith({
      deleted: [employeeData[0]],
      updated: [],
    });
  });
});

test("Removes deleted mark when clicking undelete button", async () => {
  renderEmployeeTable();
  const deleteButton = await getFirstDeleteButton();

  fireEvent.click(deleteButton);
  fireEvent.click(deleteButton);
  const submitButton = getSubmitButton();
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockSubmit).toBeCalledWith({
      deleted: [],
      updated: [],
    });
  });
});

test("Marks row as updated if any value changes", async () => {
  renderEmployeeTable();
  const nameInput = await getNameInput();

  const changedValue = "Test123";

  fireEvent.change(nameInput, { target: { value: changedValue } });
  const submitButton = getSubmitButton();
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockSubmit).toBeCalledWith({
      deleted: [],
      updated: [{ ...employeeData[0], name: changedValue }],
    });
  });
});

test("Doesnt mark row as updated if any value changes and returns back", async () => {
  renderEmployeeTable();
  const nameInput = await getNameInput();

  const changedValue = "Test123";

  fireEvent.change(nameInput, { target: { value: changedValue } });
  fireEvent.change(nameInput, { target: { value: employeeData[0].name } });
  const submitButton = getSubmitButton();
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockSubmit).toBeCalledWith({
      deleted: [],
      updated: [],
    });
  });
});

test("If changed row marked as deleted it should only be in deleted status", async () => {
  renderEmployeeTable();
  const nameInput = await getNameInput();

  const changedValue = "Test123";
  fireEvent.change(nameInput, { target: { value: changedValue } });

  const deleteButton = await getFirstDeleteButton();
  fireEvent.click(deleteButton);

  const submitButton = getSubmitButton();
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockSubmit).toBeCalledWith({
      deleted: [{ ...employeeData[0], name: changedValue }],
      updated: [],
    });
  });
});

test("Reset button resets everything back to initial state", async () => {
  renderEmployeeTable();
  const nameInput = await getNameInput();
  fireEvent.change(nameInput, { target: { value: "Test123" } });

  const surnameInput = await getSurnameInput();
  fireEvent.change(surnameInput, { target: { value: "TestSurname" } });

  const deleteButton = await getFirstDeleteButton();
  fireEvent.click(deleteButton);

  const resetButton = getResetButton();
  fireEvent.click(resetButton);

  const submitButton = getSubmitButton();
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockSubmit).toBeCalledWith({
      deleted: [],
      updated: [],
    });
  });
});
