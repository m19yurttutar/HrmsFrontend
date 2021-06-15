import React, { useEffect, useState } from "react";
import { Form, Label, Container, Button } from "semantic-ui-react";
import JobPositionService from "../../services/JobPositionService";
import CityService from "../../services/CityService";
import WorkingTypeService from "../../services/WorkingTypeService";
import WorkingTimeService from "../../services/WorkingTimeService";
import JobAdvertisementService from "../../services/JobAdvertisementService";
import "../cssFiles/AddJobAdvertisement.css";
import { toast } from "react-toastify";

export default function AddJobAdvertisement() {
  const [jobPositions, setJobPositions] = useState([]);
  const [cities, setCities] = useState([]);
  const [workingTypes, setWorkingTypes] = useState([]);
  const [workingTimes, setWorkingTimes] = useState([]);

  const jobAdvertisement = {
    applicationDeadline: "",
    city: { id: 0 },
    jobSummary: "",
    jobDescription: "",
    jobPosition: { id: 0 },
    maxSalary: 0,
    minSalary: 0,
    vacantPositionCount: 0,
    workingTime: { id: 0 },
    workingType: { id: 0 },
  };

  useEffect(() => {
    let jobPositionService = new JobPositionService();
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
  }, []);
  useEffect(() => {
    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data));
  }, []);
  useEffect(() => {
    let workingTypeService = new WorkingTypeService();
    workingTypeService
      .getWorkingTypes()
      .then((result) => setWorkingTypes(result.data.data));
  }, []);
  useEffect(() => {
    let workingTimeService = new WorkingTimeService();
    workingTimeService
      .getWorkingTimes()
      .then((result) => setWorkingTimes(result.data.data));
  }, []);

  var jobPositionOptions = jobPositions.map(function (jobPosition) {
    return {
      key: jobPosition.id,
      text: jobPosition.jobPositionName,
      value: jobPosition.id,
    };
  });
  var citiesOptions = cities.map(function (city) {
    return { key: city.id, text: city.cityName, value: city.id };
  });
  var workingTypesOptions = workingTypes.map(function (workingType) {
    return {
      key: workingType.id,
      text: workingType.workingTypeName,
      value: workingType.id,
    };
  });
  var workingTimesOptions = workingTimes.map(function (workingTime) {
    return {
      key: workingTime.id,
      text: workingTime.workingTimeName,
      value: workingTime.id,
    };
  });

  function addJobAdvertisement() {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService.add(jobAdvertisement).then(function (response) {
      if (!response.data.success) {
        toast.error(response.data.message, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
  }

  return (
    <div>
      <Container className="AddJobAdvertisementContainer">
        <Label className="Header" color="teal">
          <h3 className="Label">Yeni İş İlanı</h3>
        </Label>
        <Form className="mt-5" inverted>
          <Form.Group widths="equal">
            <Form.Select
              id="jobPositionsDropdown"
              fluid
              label="İş Pozisyonu"
              placeholder="İş Pozisyonu Seç"
              search
              required
              options={jobPositionOptions}
              onChange={(e, { value }) =>
                (jobAdvertisement.jobPosition = { id: value })
              }
            />
            <Form.Select
              id="citiesDropdown"
              fluid
              label="Şehir"
              placeholder="Şehir Seç"
              search
              required
              options={citiesOptions}
              onChange={(e, { value }) =>
                (jobAdvertisement.city = { id: value })
              }
            />
            <Form.Select
              id="workingTypesDropdown"
              fluid
              label="Çalışma Türü"
              placeholder="Çalışma Türü Seç"
              required
              options={workingTypesOptions}
              onChange={(e, { value }) =>
                (jobAdvertisement.workingType = { id: value })
              }
            />
            <Form.Select
              id="workingTimesDropdown"
              fluid
              label="Çalışma Zamanı"
              placeholder="Çalışma Zamanı Seç"
              required
              options={workingTimesOptions}
              onChange={(e, { value }) =>
                (jobAdvertisement.workingTime = { id: value })
              }
            />
          </Form.Group>
          <Form.Group className="mt-5" widths="equal">
            <Form.Input
              icon="user plus"
              iconPosition="left"
              label="Boş Pozisyon Sayısı"
              placeholder="Boş Pozisyon Sayısı Giriniz"
              required
              onChange={(e, { value }) =>
                (jobAdvertisement.vacantPositionCount = parseInt(value))
              }
            />
            <Form.Input
              icon="lira sign"
              iconPosition="left"
              label="En Düşük Ücret"
              placeholder="En Düşük Ücreti Giriniz"
              onChange={(e, { value }) =>
                (jobAdvertisement.minSalary = parseFloat(value))
              }
            />
            <Form.Input
              icon="lira sign"
              iconPosition="left"
              label="En Yüksek Ücret"
              placeholder="En Yüksek Ücreti Giriniz"
              onChange={(e, { value }) =>
                (jobAdvertisement.maxSalary = parseFloat(value))
              }
            />
            <Form.Input
              icon="calendar alternate"
              iconPosition="left"
              label="Son Başvuru Tarihi"
              placeholder="YYYY-AA-GG"
              required
              onChange={(e, { value }) =>
                (jobAdvertisement.applicationDeadline = value)
              }
            />
          </Form.Group>
          <Form.TextArea
            style={{ minHeight: 100, maxHeight: 100 }}
            className="mt-5"
            label="İş Özeti"
            placeholder="İş Özetini Giriniz (Bu alan iş ilanları kısmında gözükecek metindir)"
            required
            maxLength="450"
            onChange={(e, { value }) => (jobAdvertisement.jobSummary = value)}
          ></Form.TextArea>
          <Form.TextArea
            style={{ minHeight: 225, maxHeight: 225 }}
            className="mt-5"
            label="İş Tanımı"
            placeholder="İş Tanımını Giriniz"
            required
            onChange={(e, { value }) =>
              (jobAdvertisement.jobDescription = value)
            }
          />
          <Button
            onClick={addJobAdvertisement}
            className="Button"
            attached="bottom"
            content="İş İlanı Ekle"
            color="teal"
          />
        </Form>
      </Container>
    </div>
  );
}
