import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import EmployerService from "../services/EmployerService";

function EmployerFilter() {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getEmployers()
      .then((result) => setEmployers(result.data.data));
  }, []);

  const employerOptions = [{ key: "0", value: null, text: "Şirket Seç" }];

  employers.forEach((employer) => {
    employerOptions.push({
      key: employer.id,
      value: employer.id,
      text: employer.companyName,
    });
  });

  return (
    <div>
        <Dropdown
          className="mt-3"
          placeholder="Şirket Seç"
          fluid
          search
          selection
          options={employerOptions}
        />
    </div>
  );
}

export default EmployerFilter;
