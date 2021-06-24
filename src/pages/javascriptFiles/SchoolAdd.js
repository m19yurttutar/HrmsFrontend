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
import SchoolService from "../../services/SchoolService";
import { toast } from "react-toastify";

export default function SchoolAdd(props) {
  const initialValues = {
    schoolName: "",
    departmentName: "",
    startYear: "",
    graduationYear: "",
  };

  const schema = Yup.object({
    schoolName: Yup.string().required("Bu alan boş bırakılamaz"),
    startYear: Yup.number().required("Bu alan boş bırakılamaz"),
  });

  function handleSubmit(values) {
    let schoolService = new SchoolService();
    schoolService.add(values).then(function (response) {
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
      });
      props.addSchool();
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
            onClick={props.addSchool}
            size="medium"
            icon="arrow right"
          />
          <Form className="ui form inverted">
            <FormField className="text-center">
              <Label size="big" color="blue" content="Yeni Okul" />
            </FormField>
            <FormGroup className="mt-4" widths="equal">
              <FormField>
                <HrmsTextInput
                  label="Okul Adı*"
                  name="schoolName"
                  placeholder="Okul Adı Giriniz"
                  icon="building"
                  iconPosition="left"
                />
              </FormField>
              <FormField>
                <HrmsTextInput
                  label="Başlama Yılı*"
                  name="startYear"
                  placeholder="Başlama Yılı Giriniz"
                  icon="student"
                  iconPosition="left"
                  type="number"
                />
              </FormField>
            </FormGroup>
            <FormGroup className="mt-4" widths="equal">
              <FormField>
                <HrmsTextInput
                  label="Bölüm Adı"
                  name="departmentName"
                  placeholder="Bölüm Adı Giriniz"
                  icon="building"
                  iconPosition="left"
                />
              </FormField>
              <FormField>
                <HrmsTextInput
                  label="Mezuniyet Yılı"
                  name="graduationYear"
                  placeholder="Mezuniyet Yılını Giriniz"
                  icon="student"
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
                content="Yeni Okul Ekle"
              />
            </FormField>
          </Form>
        </Segment>
      </Formik>
    </div>
  );
}
