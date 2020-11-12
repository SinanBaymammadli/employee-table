import { Box, Grid, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../queryKeys";
import { EmployeeTable } from "./EmployeeTable";
import { employeeService } from "./employeeService";
import { IEmployeeFormRequest } from "./models";

export function EmployeePage() {
  const { data, isLoading } = useQuery(QUERY_KEYS.employeeList, () => employeeService.getList());
  const [formData, setFormData] = useState<IEmployeeFormRequest>({ updated: [], deleted: [] });

  function onSubmit(form: IEmployeeFormRequest) {
    setFormData(form);
  }

  return (
    <>
      <EmployeeTable initialValues={{ employees: data ?? [] }} onSubmit={onSubmit} isLoading={isLoading} />

      <Box pt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <Box p={2}>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
