import React from "react";
import { Switch, Route } from "react-router-dom";
import { Box, AppBar, Toolbar, Grid, Typography, Badge, Container, IconButton } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { EmployeePage } from "./modules/employee/EmployeePage";

export function App() {
  return (
    <>
      <AppBar position="absolute">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h6">Employee table</Typography>

            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>

      <main>
        <Box py={4} />
        <Box p={4}>
          <Container maxWidth="lg">
            <Switch>
              <Route path="/">
                <EmployeePage />
              </Route>
            </Switch>
          </Container>
        </Box>
      </main>
    </>
  );
}
