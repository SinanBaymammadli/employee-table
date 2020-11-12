import {
  TableRow,
  Grid,
  Button,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Box,
} from "@material-ui/core";
import React from "react";
import { EmployeeTableFilter } from "./EmployeeTableFilter";
import { IEmployee, IEmployeeFilter, IEmployeeForm, IEmployeeFormRequest } from "./models";
import { filterEmployeeList, isDifferent } from "./utils";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";
import { Pagination } from "@material-ui/lab";
import { EmployeeTableSkeleton } from "./EmployeeTableSkeleton";
import { EmployeeTableItem } from "./EmployeeTableItem";
import { getPaginatedItems, useSearchParams } from "../../utils";

const schema = yup.object().shape<IEmployeeForm>({
  employees: yup
    .array<IEmployee>()
    .of(
      yup
        .object()
        .shape<IEmployee>({
          id: yup.string().required(),
          name: yup.string().required("Field is required"),
          surname: yup.string().required("Field is required"),
          position: yup.string().required("Field is required"),
          dateOfBirth: yup
            .string()
            .matches(/^(?:(0[1-9]|[12][0-9]|3[01])[-.](0[1-9]|1[012])[-.](19|20)[0-9]{2})$/, "Wrong format")
            .required("Field is required"),
          phoneNumber: yup
            .string()
            .min(10, "Wrong format")
            .matches(/\d{3}-\d{3}-\d{2}-\d{2}/, "Wrong format")
            .required("Field is required"),
        })
        .required()
    )
    .required(),
});

interface IProps {
  initialValues: IEmployeeForm;
  isLoading?: boolean;
  onSubmit: (form: IEmployeeFormRequest) => void;
}

export function EmployeeTable({ initialValues, onSubmit, isLoading }: IProps) {
  const [filter, setFilter] = useSearchParams<IEmployeeFilter>();
  const page = filter.page ?? 1;
  const count = filter.count ?? 5;

  function handleFormSubmit(form: IEmployee[]) {
    const deleted = form.filter((f) => f.deleted).map(({ deleted, ...rest }) => rest);
    const updated = form
      .filter((f) => !f.deleted)
      .filter((f) => {
        const old = initialValues.employees.find((e) => e.id === f.id);
        if (!old) return false;
        return isDifferent(old, f);
      });

    onSubmit({ deleted, updated });
  }

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur
      enableReinitialize
      onSubmit={(values) => handleFormSubmit(values.employees)}
      validationSchema={schema}
    >
      {(formikProps) => {
        const { values, resetForm, isValid } = formikProps;
        const paginated = getPaginatedItems(filterEmployeeList(values.employees, filter), page, count);

        return (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <Button variant="contained" color="primary" onClick={() => resetForm()}>
                    Reset
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <EmployeeTableFilter />
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Surname</TableCell>
                        <TableCell>Position</TableCell>
                        <TableCell>Date of birth</TableCell>
                        <TableCell>Phone number</TableCell>
                        <TableCell align="right" width={200}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading && <EmployeeTableSkeleton />}
                      <FieldArray
                        name="employees"
                        render={() =>
                          paginated.data.map((employee) => (
                            <EmployeeTableItem
                              key={employee.id}
                              employee={employee}
                              formikProps={formikProps}
                              initialValues={initialValues}
                            />
                          ))
                        }
                      />
                    </TableBody>
                  </Table>

                  <Box p={3}>
                    <Pagination
                      count={paginated.totalPages}
                      onChange={(_, page) => {
                        setFilter({
                          ...filter,
                          page,
                        });
                      }}
                    />
                  </Box>
                </TableContainer>
              </Grid>

              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <Button variant="contained" color="primary" type="submit" disabled={!isValid}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}
