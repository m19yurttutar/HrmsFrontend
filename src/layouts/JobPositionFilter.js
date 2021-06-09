import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import JobPositionService from "../services/JobPositionService";

function JobPositionFilter() {
  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    let jobPositionService = new JobPositionService();
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
  }, []);

  const jobPositionOptions = [{ key: "0", value: null, text: "Pozisyon Seç" }];

  jobPositions.forEach((jobPosition) => {
    jobPositionOptions.push({
      key: jobPosition.id,
      value: jobPosition.id,
      text: jobPosition.jobPositionName,
    });
  });

  return (
    <div>
        <Dropdown
          className="mt-3"
          placeholder="Pozisyon Seç"
          fluid
          search
          selection
          options={jobPositionOptions}
        />
    </div>
  );
}

export default JobPositionFilter;
