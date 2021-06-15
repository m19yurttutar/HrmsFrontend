import React from "react";
import { Grid, GridRow, GridColumn } from "semantic-ui-react";
import JobAdvertisementList from "./JobAdvertisementList";
import Sidebar from "./Sidebar";

export default function Home() {
  return (
    <div>
      <Grid>
        <GridRow>
          <GridColumn width={12}>
            <JobAdvertisementList />
          </GridColumn>
          <GridColumn width={4}>
            <Sidebar />
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}
