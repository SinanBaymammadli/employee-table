import React from "react";
import { IconButton, TableCell, TableRow, TextField } from "@material-ui/core";
import { IEmployeeFilter } from "./models";
import CloseIcon from "@material-ui/icons/Close";
import { useSearchParams } from "../../utils";

export function EmployeeTableFilter() {
  const [filter, setFilter] = useSearchParams<IEmployeeFilter>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  }

  return (
    <TableRow>
      <TableCell>Filters</TableCell>
      <TableCell>
        <TextField value={filter.name ?? ""} onChange={handleChange} name="name" placeholder="Name" />
      </TableCell>
      <TableCell>
        <TextField value={filter.surname ?? ""} onChange={handleChange} name="surname" placeholder="Surame" />
      </TableCell>
      <TableCell>
        <TextField value={filter.position ?? ""} onChange={handleChange} name="position" placeholder="Position" />
      </TableCell>
      <TableCell>
        <TextField
          value={filter.dateOfBirth ?? ""}
          onChange={handleChange}
          name="dateOfBirth"
          placeholder="Date of birth"
        />
      </TableCell>
      <TableCell>
        <TextField
          value={filter.phoneNumber ?? ""}
          onChange={handleChange}
          name="phoneNumber"
          placeholder="Phone number"
        />
      </TableCell>
      <TableCell width={200}>
        <IconButton onClick={() => setFilter({ page: filter.page, count: filter.count })}>
          <CloseIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
