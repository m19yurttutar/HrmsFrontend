import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  FormField,
  Label,
  FormGroup,
  Segment,
  Button,
} from "semantic-ui-react";
import HrmsTextInput from "../../utilities/customFormControls/HrmsTextInput";
import "../cssFiles/CurriculumVitae.css";
import WorkExperienceService from "../../services/WorkExperienceService";
import { toast } from "react-toastify";

export default function WorkExperienceAdd(props) {
  const initialValues = {
    companyName: "",
    positionName: "",
    startYear: "",
    quitYear: "",
  };

  const schema = Yup.object({
    companyName: Yup.string().required("Bu alan boş bırakılamaz"),
    startYear: Yup.number().required("Bu alan boş bırakılamaz"),
  });

  function handleSubmit(values) {
    let workExperienceService = new WorkExperienceService();
    workExperienceService
      .add(values)
      .then(function (response) {
        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
        });
        props.addWorkExperience();
      });
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Segment className="bg-dark">
          <Label
            as={Button}
            ribbon="right"
            color="teal"
            onClick={props.addWorkExperience}
            size="medium"
            icon="arrow right"
          />
          <Form className="ui form inverted">
            <FormField className="text-center">
              <Label size="big" color="blue" content="Yeni İş Tecrübesi" />
            </FormField>
            <FormGroup className="mt-4" widths="equal">
              <FormField>
                <HrmsTextInput
                  label="Şirket Adı*"
                  name="companyName"
                  placeholder="Şirket Adı Giriniz"
                  icon="building"
                  iconPosition="left"
                />
              </FormField>
              <FormField>
                <HrmsTextInput
                  label="İşe Başlama Yılı*"
                  name="startYear"
                  placeholder="İşe Başlama Yılını Giriniz"
                  icon="calendar alternate"
                  iconPosition="left"
                  type="number"
                />
              </FormField>
            </FormGroup>
            <FormGroup className="mt-4" widths="equal">
              <FormField>
                <HrmsTextInput
                  label="Pozisyon Adı"
                  name="positionName"
                  placeholder="Pozisyon Adı Giriniz"
                  icon="building"
                  iconPosition="left"
                />
              </FormField>
              <FormField>
                <HrmsTextInput
                  label="İş Bırakma Yılı"
                  name="quitYear"
                  placeholder="İş Bırakma Yılını Giriniz"
                  icon="calendar alternate"
                  iconPosition="left"
                  type="number"
                />
              </FormField>
            </FormGroup>
            <FormField className="mt-4 text-center">
              <Button
                fluid
                color="green"
                size="large"
                content="Yeni İş Tecrübesi Ekle"
                type="submit"
              />
            </FormField>
          </Form>
        </Segment>
      </Formik>
    </div>
  );
}
