import React, { useEffect, useState } from "react";
import { Accordion, Menu, Button, Dropdown } from "semantic-ui-react";
import CityService from "../../services/CityService";
import JobPositionService from "../../services/JobPositionService";
import EmployerService from "../../services/EmployerService";

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [employers, setEmployers] = useState([]);

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

  const cityOptions = [{ key: 0, value: null, text: "Şehir Seç" }];
  const jobPositionOptions = [{ key: "0", value: null, text: "Pozisyon Seç" }];
  const employerOptions = [{ key: "0", value: null, text: "Şirket Seç" }];

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

  function handleCityFilterActivityIndex(params){
    if(activeIndex === 0){
      setActiveIndex(-1)
    }else{
      setActiveIndex(0)
    }
  }

  function handleJoPositionFilterActivityIndex(params){
    if(activeIndex === 1){
      setActiveIndex(-1)
    }else{
      setActiveIndex(1)
    }
  }

  function handleEmployerFilterActivityIndex(params){
    if(activeIndex === 2){
      setActiveIndex(-1)
    }else{
      setActiveIndex(2)
    }
  }

  return (
    <div>
      <Accordion className="bg-dark" as={Menu} fluid vertical>
        <Menu.Item>
          <Accordion.Title
            className="text-white font-weight-bold"
            content="Şehirler"
            active={activeIndex === 0}
            onClick={handleCityFilterActivityIndex}
            index={0}
          />
          <Accordion.Content className="text-white" active={activeIndex === 0}>
            <Dropdown
              className="mt-3"
              placeholder="Şehir Seç"
              fluid
              search
              selection
              options={cityOptions}
            />
          </Accordion.Content>
        </Menu.Item>
        <Menu.Item>
          <Accordion.Title
            className="text-white font-weight-bold"
            content="İş Pozisyonları"
            active={activeIndex === 1}
            onClick={handleJoPositionFilterActivityIndex}
            index={1}
          />
          <Accordion.Content className="text-white" active={activeIndex === 1}>
            <Dropdown
              className="mt-3"
              placeholder="Pozisyon Seç"
              fluid
              search
              selection
              options={jobPositionOptions}
            />
          </Accordion.Content>
        </Menu.Item>
        <Menu.Item>
          <Accordion.Title
            className="text-white font-weight-bold"
            content="Şirketler"
            active={activeIndex === 2}
            onClick={handleEmployerFilterActivityIndex}
            index={2}
          />
          <Accordion.Content className="text-white" active={activeIndex === 2}>
            <Dropdown
              className="mt-3"
              placeholder="Şirket Seç"
              fluid
              search
              selection
              options={employerOptions}
            />
          </Accordion.Content>
        </Menu.Item>
      </Accordion>
      <Button className="bg-dark text-white" fluid>
        Filtrele
      </Button>
    </div>
  );
}
