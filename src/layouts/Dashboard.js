import React from "react";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import JobAdvertisementList from "../pages/JobAdvertisementList";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div>
      <Grid className="pt-5">
        <GridRow>
          <GridColumn width={4}>
            <Sidebar />
          </GridColumn>
          <GridColumn width={12} className="pl-5">
            <JobAdvertisementList />
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}

export default Dashboard;
