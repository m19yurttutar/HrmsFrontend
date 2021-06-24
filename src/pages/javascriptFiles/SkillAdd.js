import React from "react";
import { Formik, Form } from "formik";
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
import { toast } from "react-toastify";
import SkillService from "../../services/SkillService";

export default function SkillAdd(props) {
  const initialValues = {
    programmingTechnologyName: "",
  };

  const schema = Yup.object({
    programmingTechnologyName: Yup.string().required("Bu alan boş bırakılamaz"),
  });

  function handleSubmit(values) {
    let skillService = new SkillService();
    skillService.add(values).then(function (response) {
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
      });
      props.addSkill();
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
            onClick={props.addSkill}
            size="medium"
            icon="arrow right"
          />
          <Form className="ui form inverted">
            <FormField className="text-center">
              <Label size="big" color="blue" content="Yeni Yetenek" />
            </FormField>
            <FormGroup className="mt-4" widths="equal">
              <FormField>
                <HrmsTextInput
                  label="Programlama/Teknoloji Adı*"
                  name="programmingTechnologyName"
                  placeholder="Programlama/Teknoloji Adı Giriniz"
                  icon="microchip"
                  iconPosition="left"
                />
              </FormField>
            </FormGroup>
            <FormField className="mt-4 text-center">
              <Button
                fluid
                color="green"
                size="large"
                content="Yeni Yetenek Ekle"
              />
            </FormField>
          </Form>
        </Segment>
      </Formik>
    </div>
  );
}
