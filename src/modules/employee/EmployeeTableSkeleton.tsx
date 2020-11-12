import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export function EmployeeTableSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => {
        return (
          <TableRow key={i}>
            <TableCell>
              <Skeleton variant="rect" height={31} width={10} />
            </TableCell>
            <TableCell>
              <Skeleton variant="rect" height={31} />
            </TableCell>
            <TableCell>
              <Skeleton variant="rect" height={31} />
            </TableCell>
            <TableCell>
              <Skeleton variant="rect" height={31} />
            </TableCell>
            <TableCell>
              <Skeleton variant="rect" height={31} />
            </TableCell>
            <TableCell>
              <Skeleton variant="rect" height={31} />
            </TableCell>
            <TableCell align="right" width={200}>
              <Skeleton variant="rect" height={31} width={83} style={{ display: "inline-block" }} />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
