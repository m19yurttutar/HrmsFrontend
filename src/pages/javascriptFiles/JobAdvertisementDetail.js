import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Grid, GridRow, GridColumn } from "semantic-ui-react";
import JobAdvertisementService from "../../services/JobAdvertisementService";

export default function JobAdvertisementDetail() {

  let { id } = useParams();

  const [jobAdvertisement, setJobAdvertisement] = useState({})

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService.getById(id).then(result=>setJobAdvertisement(result.data.data))
  },[])

  return (
    <div>
      <Grid className="pt-5">
        <GridRow>
          <GridColumn width={12}>
            {jobAdvertisement.jobDescription}
          </GridColumn>
          <GridColumn width={4}>
            
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}
