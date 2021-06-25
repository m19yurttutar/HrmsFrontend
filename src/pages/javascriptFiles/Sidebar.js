import React, { useEffect, useState } from "react";
import { Accordion, Menu, Button, Dropdown } from "semantic-ui-react";
import CityService from "../../services/CityService";
import JobPositionService from "../../services/JobPositionService";
import EmployerService from "../../services/EmployerService";

export default function Sidebar({ handleFilter }) {
  const [cityFilterActivityIndex, setCityFilterActivityIndex] = useState(0)
  const [jobPositionFilterActivityIndex, setJobPositionFilterActivityIndex] = useState(0)
  const [employerFilterActivityIndex, setEmployerFilterActivityIndex] = useState(0)

  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [employers, setEmployers] = useState([]);
  
  const [filterCityValue, setFilterCityValue] = useState("")
  const [filterJobPositionValue, setFilterJobPositionValue] = useState("")
  const [filterEmployerValue, setFilterEmployerValue] = useState("")

  useEffect(() => {
    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data));
  }, []);
  useEffect(() => {
    let jobPositionService = new JobPositionService();
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
  }, []);
  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getEmployers()
      .then((result) => setEmployers(result.data.data));
  }, []);

  const cityOptions = [];
  const jobPositionOptions = [];
  const employerOptions = [];

  cities.forEach((city) => {
    cityOptions.push({
      key: city.id,
      value: city.id,
      text: city.cityName,
    });
  });
  jobPositions.forEach((jobPosition) => {
    jobPositionOptions.push({
      key: jobPosition.id,
      value: jobPosition.id,
      text: jobPosition.jobPositionName,
    });
  });
  employers.forEach((employer) => {
    employerOptions.push({
      key: employer.id,
      value: employer.id,
      text: employer.companyName,
    });
  });

  function handleCityFilterActivityIndex(){
    if(cityFilterActivityIndex === 0){
      setCityFilterActivityIndex(1)
    }else{
      setCityFilterActivityIndex(0)
    }
  }

  function handleJobPositionFilterActivityIndex(){
    if(jobPositionFilterActivityIndex === 0){
      setJobPositionFilterActivityIndex(1)
    }else{
      setJobPositionFilterActivityIndex(0)
    }
  }

  function handleEmployerFilterActivityIndex(){
    if(employerFilterActivityIndex === 0){
      setEmployerFilterActivityIndex(1)
    }else{
      setEmployerFilterActivityIndex(0)
    }
  }

  return (
    <div>
      <Accordion className="bg-dark" as={Menu} fluid vertical>
        <Menu.Item>
          <Accordion.Title
            className="text-white font-weight-bold"
            content="Şehirler"
            active={cityFilterActivityIndex === 1}
            onClick={handleCityFilterActivityIndex}
            index={0}
          />
          <Accordion.Content className="text-white" active={cityFilterActivityIndex === 1}>
            <Dropdown
              className="mt-3"
              placeholder="Şehir Seç"
              fluid
              search
              selection
              clearable
              options={cityOptions}
              onChange={(e, { value }) => setFilterCityValue(value)}
            />
          </Accordion.Content>
        </Menu.Item>
        <Menu.Item>
          <Accordion.Title
            className="text-white font-weight-bold"
            content="İş Pozisyonları"
            active={jobPositionFilterActivityIndex === 1}
            onClick={handleJobPositionFilterActivityIndex}
            index={1}
          />
          <Accordion.Content className="text-white" active={jobPositionFilterActivityIndex === 1}>
            <Dropdown
              className="mt-3"
              placeholder="Pozisyon Seç"
              fluid
              search
              selection
              clearable
              options={jobPositionOptions}
              onChange={(e, { value }) => setFilterJobPositionValue(value)}
            />
          </Accordion.Content>
        </Menu.Item>
        <Menu.Item>
          <Accordion.Title
            className="text-white font-weight-bold"
            content="Şirketler"
            active={employerFilterActivityIndex === 1}
            onClick={handleEmployerFilterActivityIndex}
            index={2}
          />
          <Accordion.Content className="text-white" active={employerFilterActivityIndex === 1}>
            <Dropdown
              className="mt-3"
              placeholder="Şirket Seç"
              fluid
              search
              selection
              clearable
              options={employerOptions}
              onChange={(e, { value }) => setFilterEmployerValue(value)}
            />
          </Accordion.Content>
        </Menu.Item>
      </Accordion>
      <Button className="bg-dark text-white" fluid content="Filtrele" onClick={() => handleFilter({ cityId: filterCityValue, jobPositionId: filterJobPositionValue, employerId: filterEmployerValue })}/>
    </div>
  );
}
