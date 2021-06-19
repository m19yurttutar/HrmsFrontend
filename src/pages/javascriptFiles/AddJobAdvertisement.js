import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Form, Label } from "semantic-ui-react";
import CityService from "../../services/CityService";
import JobPositionService from "../../services/JobPositionService";
import WorkingTimeService from "../../services/WorkingTimeService";
import WorkingTypeService from "../../services/WorkingTypeService";
import JobAdvertisementService from "../../services/JobAdvertisementService";
import "../cssFiles/AddJobAdvertisement.css";
import { toast } from "react-toastify";

export default function JobAdCreate() {
  const [workingTimes, setWorkingTimes] = useState([]);
  const [workingTypes, setWorkingTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  const JobAdvertisementSchema = Yup.object().shape({
    jobPositionId: Yup.number().required("Bu alan boş bırakılamaz"),
    cityId: Yup.number().required("Bu alan boş bırakılamaz"),
    workingTypeId: Yup.number().required("Bu alan boş bırakılamaz"),
    workingTimeId: Yup.number().required("Bu alan boş bırakılamaz"),
    vacantPositionCount: Yup.number()
      .required("Bu alan boş bırakılamaz")
      .min(1, "En az 1 kişilik boş pozisyon olmak zorunda!"),
    applicationDeadline: Yup.string()
      .matches(
        /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/,
        "Girmiş olduğunuz son başvuru tarihi, tarih formatında değildir.(YYYY-AA-GG)"
      )
      .required("Bu alan boş bırakılamaz!"),
    jobSummary: Yup.string().required("Bu alan boş bırakılamaz!"),
    jobDescription: Yup.string().required("Bu alan boş bırakılamaz!"),
  });

  const formik = useFormik({
    initialValues: {
      jobPositionId: "",
      cityId: "",
      workingTypeId: "",
      workingTimeId: "",
      vacantPositionCount: "",
      minSalary: "",
      maxSalary: "",
      applicationDeadline: "",
      jobSummary: "",
      jobDescription: "",
    },

    validationSchema: JobAdvertisementSchema,

    onSubmit: (jobAdvertisement) => {
      jobAdvertisement.jobPositionId = parseInt(jobAdvertisement.jobPositionId);
      jobAdvertisement.cityId = parseInt(jobAdvertisement.cityId);
      jobAdvertisement.workingTypeId = parseInt(jobAdvertisement.workingTypeId);
      jobAdvertisement.workingTimeId = parseInt(jobAdvertisement.workingTimeId);
      jobAdvertisement.vacantPositionCount = parseInt(jobAdvertisement.vacantPositionCount);
      jobAdvertisement.minSalary = parseInt(jobAdvertisement.minSalary);
      jobAdvertisement.maxSalary = parseInt(jobAdvertisement.maxSalary);

      let jobAdvertisementService = new JobAdvertisementService();

      jobAdvertisementService.add(jobAdvertisement).then(function (response) {
        if (!response.data.success) {
          toast.error(response.data.message, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
          });
        } else {
          toast.success(response.data.message, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
          });
        }
      });
    },
  });

  useEffect(() => {
    let workingTimeService = new WorkingTimeService();
    let workingTypeService = new WorkingTypeService();
    let cityService = new CityService();
    let jobPositionService = new JobPositionService();

    workingTimeService
      .getWorkingTimes()
      .then((result) => setWorkingTimes(result.data.data));
    workingTypeService
      .getWorkingTypes()
      .then((result) => setWorkingTypes(result.data.data));
    cityService.getCities().then((result) => setCities(result.data.data));
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
  }, []);

  const workingTimeOptions = workingTimes.map((workingTime) => ({
    key: workingTime.id,
    text: workingTime.workingTimeName,
    value: workingTime.id,
  }));
  const workingTypeOptions = workingTypes.map((workingType) => ({
    key: workingType.id,
    text: workingType.workingTypeName,
    value: workingType.id,
  }));
  const cityOptions = cities.map((city) => ({
    key: city.id,
    text: city.cityName,
    value: city.id,
  }));
  const jobPositionOptions = jobPositions.map((jobPosition) => ({
    key: jobPosition.id,
    text: jobPosition.jobPositionName,
    value: jobPosition.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
      <Container className="AddJobAdvertisementContainer">
        <Form id="addJobAdvertisementForm" onSubmit={formik.handleSubmit}>
          <Form.Field className="Header">
            <Label size="massive" color="teal" content="Yeni İş İlanı"></Label>
          </Form.Field>
          <Form.Field className="mt-4">
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Select
                  label="İş Pozisyonu*"
                  clearable
                  placeholder="İş Pozisyonu Seç"
                  search
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "jobPositionId")
                  }
                  onBlur={formik.onBlur}
                  name="jobPositionId"
                  value={formik.values.jobPositionId}
                  options={jobPositionOptions}
                />
                {formik.errors.jobPositionId &&
                  formik.touched.jobPositionId && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.cityId}
                    </div>
                  )}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  clearable
                  label="Şehir*"
                  placeholder="Şehir Seç"
                  search
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "cityId")
                  }
                  onBlur={formik.onBlur}
                  name="cityId"
                  value={formik.values.cityId}
                  options={cityOptions}
                />
                {formik.errors.cityId && formik.touched.cityId && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.cityId}
                  </div>
                )}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  clearable
                  label="Çalışma Türü*"
                  placeholder="Çalışma Türü Seç"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "workingTypeId")
                  }
                  onBlur={formik.onBlur}
                  name="workingTypeId"
                  value={formik.values.workingTypeId}
                  options={workingTypeOptions}
                />
                {formik.errors.workingTypeId &&
                  formik.touched.workingTypeId && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.workingTypeId}
                    </div>
                  )}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  clearable
                  label="Çalışma Zamanı*"
                  placeholder="Çalışma Zamanı Seç"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "workingTimeId")
                  }
                  onBlur={formik.onBlur}
                  name="workingTimeId"
                  value={formik.values.workingTimeId}
                  options={workingTimeOptions}
                />
                {formik.errors.workingTimeId &&
                  formik.touched.workingTimeId && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.workingTimeId}
                    </div>
                  )}
              </Form.Field>
            </Form.Group>
          </Form.Field>
          <Form.Field className="mt-4">
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  icon="user plus"
                  iconPosition="left"
                  label="Boş Pozisyon Sayısı*"
                  name="vacantPositionCount"
                  onChange={formik.handleChange}
                  value={formik.values.vacantPositionCount}
                  onBlur={formik.handleBlur}
                  type="number"
                  placeholder="Boş Pozisyon Sayısı Gir"
                />
                {formik.errors.vacantPositionCount &&
                  formik.touched.vacantPositionCount && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.vacantPositionCount}
                    </div>
                  )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  icon="lira"
                  iconPosition="left"
                  label="En Düşük Ücret"
                  type="number"
                  placeholder="En Düşük Ücret Gir"
                  value={formik.values.minSalary}
                  name="minSalary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.minSalary && formik.touched.minSalary && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.minSalary}
                  </div>
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  icon="lira"
                  iconPosition="left"
                  type="number"
                  label="En Yüksek Ücret"
                  placeholder="En Yüksek Ücret Gir"
                  value={formik.values.maxSalary}
                  name="maxSalary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.maxSalary && formik.touched.maxSalary && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.maxSalary}
                  </div>
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Son Başvuru Tarihi*"
                  placeholder="YYYY-AA-GG"
                  icon="calendar alternate"
                  iconPosition="left"
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "applicationDeadline")
                  }
                  value={formik.values.applicationDeadline}
                  onBlur={formik.handleBlur}
                  name="applicationDeadline"
                />
                {formik.errors.applicationDeadline &&
                  formik.touched.applicationDeadline && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.applicationDeadline}
                    </div>
                  )}
              </Form.Field>
            </Form.Group>
          </Form.Field>
          <Form.Field className="mt-4">
            <Form.TextArea
              maxLength="450"
              placeholder="İş Özeti Gir (**Bu metin iş ilanları listelenirken gözükecek metindir**)"
              label="İş Özeti*"
              style={{ minHeight: "100px", maxHeight: "100px" }}
              value={formik.values.jobSummary}
              name="jobSummary"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.jobSummary && formik.touched.jobSummary && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.jobSummary}
              </div>
            )}
          </Form.Field>
          <Form.Field className="mt-4">
            <Form.TextArea
              placeholder="İş Tanımı Gir (**Bu metin iş ilanı detaylarında gözükecek metindir**)"
              label="İş Tanımı*"
              style={{ minHeight: "225px", maxHeight: "225px" }}
              value={formik.values.jobDescription}
              name="jobDescription"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.jobDescription && formik.touched.jobDescription && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.jobDescription}
              </div>
            )}
          </Form.Field>
          <Form.Field className="mt-4">
            <Form.Button
              fluid
              size="big"
              className="addJobAdvertisementButton"
              animated
              content="İş İlanı Ekle"
              labelPosition="right"
              icon="add"
              color="teal"
              type="submit"
            />
          </Form.Field>
        </Form>
      </Container>
    </div>
  );
}