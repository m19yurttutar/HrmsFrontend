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
import LanguageService from "../../services/LanguageService";
import { toast } from "react-toastify";

export default function LanguageAdd(props) {
  const initialValues = {
    language: "",
    languageLevel: "",
  };

  const schema = Yup.object({
    language: Yup.string().required("Bu alan boş bırakılamaz"),
    languageLevel: Yup.number()
      .required("Bu alan boş bırakılamaz")
      .max(5, "Dil seviyesi en fazla 5 olabilir")
      .min(1, "Dil seviyesi en az 1 olabilir"),
  });

  function handleSubmit(values) {
    let languageService = new LanguageService();
    languageService.add(values).then(function (response) {
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
      });
      props.addLanguage();
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
            onClick={props.addLanguage}
            size="medium"
            icon="arrow right"
          />
          <Form className="ui form inverted">
            <FormField className="text-center">
              <Label size="big" color="blue" content="Yeni Dil" />
            </FormField>
            <FormGroup className="mt-4" widths="equal">
              <FormField>
                <HrmsTextInput
                  label="Dil*"
                  name="language"
                  placeholder="Dil Giriniz"
                  icon="language"
                  iconPosition="left"
                />
              </FormField>
              <FormField>
                <HrmsTextInput
                  label="Dil Seviyesi*"
                  name="languageLevel"
                  placeholder="Dil Seviyenizi Giriniz"
                  icon="star"
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
                content="Yeni Dil Ekle"
              />
            </FormField>
          </Form>
        </Segment>
      </Formik>
    </div>
  );
}
