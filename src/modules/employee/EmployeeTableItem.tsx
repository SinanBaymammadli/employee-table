import { TableRow, TableCell, TextField, Button } from "@material-ui/core";
import { FormikProps } from "formik";
import React from "react";
import { IEmployee, IEmployeeForm } from "./models";

interface IProps {
  employee: IEmployee;
  formikProps: FormikProps<IEmployeeForm>;
  initialValues: IEmployeeForm;
}

export function EmployeeTableItem({ employee, formikProps, initialValues }: IProps) {
  const { errors, handleChange, handleBlur, setFieldValue } = formikProps;
  const isDeleted = Boolean(employee.deleted);
  const index = initialValues.employees.findIndex((f) => f.id === employee.id);
  const employeeErrors = errors.employees?.[index] as Partial<IEmployee> | undefined;
  const employeeField = `employees[${index}]`;

  return (
    <TableRow>
      <TableCell>{employee.id}</TableCell>
      <TableCell>
        <TextField
          name={`${employeeField}.name`}
          value={employee.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(employeeErrors?.name)}
          helperText={employeeErrors?.name}
          disabled={isDeleted}
          placeholder="Name"
        />
      </TableCell>
      <TableCell>
        <TextField
          name={`${employeeField}.surname`}
          value={employee.surname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(employeeErrors?.surname)}
          helperText={employeeErrors?.surname}
          disabled={isDeleted}
          placeholder="Surname"
        />
      </TableCell>
      <TableCell>
        <TextField
          name={`${employeeField}.position`}
          value={employee.position}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(employeeErrors?.position)}
          helperText={employeeErrors?.position}
          disabled={isDeleted}
          placeholder="Position"
        />
      </TableCell>
      <TableCell>
        <TextField
          name={`${employeeField}.dateOfBirth`}
          value={employee.dateOfBirth}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(employeeErrors?.dateOfBirth)}
          helperText={employeeErrors?.dateOfBirth}
          disabled={isDeleted}
          placeholder="Date of birth"
        />
      </TableCell>
      <TableCell>
        <TextField
          name={`${employeeField}.phoneNumber`}
          value={employee.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(employeeErrors?.phoneNumber)}
          helperText={employeeErrors?.phoneNumber}
          disabled={isDeleted}
          placeholder="Phone number"
        />
      </TableCell>
      <TableCell align="right" width={200}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setFieldValue(`${employeeField}.deleted`, isDeleted ? "" : true);
          }}
        >
          {isDeleted ? "Undelete" : "Delete"}
        </Button>
      </TableCell>
    </TableRow>
  );
}
