import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import {
  FormField,
  FormGroup,
  Button,
  Table,
  Accordion,
  Menu,
  Rating,
  Container,
  Label,
} from "semantic-ui-react";
import HrmsTextInput from "../../utilities/customFormControls/HrmsTextInput";
import HrmsTextArea from "../../utilities/customFormControls/HrmsTextArea";
import CurriculumVitaeService from "../../services/CurriculumVitaeService";
import "../cssFiles/CurriculumVitae.css";
import { toast } from "react-toastify";
import SchoolAdd from "./SchoolAdd";
import LanguageAdd from "./LanguageAdd";
import SkillAdd from "./SkillAdd";
import WorkExperienceAdd from "./WorkExperienceAdd";
import SchoolService from "../../services/SchoolService";
import LanguageService from "../../services/LanguageService";
import SkillService from "../../services/SkillService";
import WorkExperienceService from "../../services/WorkExperienceService";

export default function CurriculumVitaeUpdate() {
  let { id } = useParams();

  const [schools, setSchools] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([]);

  const [schoolActivityIndex, setSchoolActivityIndex] = useState(0);
  const [languagesActivityIndex, setLanguagesActivityIndex] = useState(0);
  const [skillsActivityIndex, setSkillsActivityIndex] = useState(0);
  const [workExperiencesActivityIndex, setWorkExperiencesActivityIndex] =
    useState(0);

  const initialValues = {
    githubAccountLink: "",
    linkedinAccountLink: "",
    coverLetter: "",
  };

  useEffect(() => {
    let schoolService = new SchoolService();
    let languageService = new LanguageService();
    let skillService = new SkillService();
    let workExperienceService = new WorkExperienceService();

    schoolService
      .getByJobSeekerIdSorted(id)
      .then((response) => setSchools(response.data.data))
      .catch();
    languageService
      .getByJobSeekerIdSorted(id)
      .then((response) => setLanguages(response.data.data))
      .catch();
    skillService
      .getByJobSeekerId(id)
      .then((response) => setSkills(response.data.data))
      .catch();
    workExperienceService
      .getByJobSeekerId(id)
      .then((response) => setWorkExperiences(response.data.data))
      .catch();
  }, []);

  const schema = Yup.object({
    githubAccountLink: Yup.string().url("Bu alan URL formatında olmalıdır"),
    linkedinAccountLink: Yup.string().url("Bu alan URL formatında olmalıdır"),
    coverLetter: Yup.string().required("Bu alan boş bırakılamaz"),
  });

  function handleSubmit(values) {
    let curriculumVitaeService = new CurriculumVitaeService();
    const curriculumVitae = {
      id: 1,
      connection: {
        id: 1,
        githubAccountLink: values.githubAccountLink,
        linkedinAccountLink: values.linkedinAccountLink,
      },
      coverLetter: values.coverLetter,
    };

    curriculumVitaeService.update(curriculumVitae).then(function (response) {
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
  }

  function handleSchoolDelete(school) {
    var isConfirmed = window.confirm("Silmek istediğinize emin misiniz ?");
    if (isConfirmed) {
      let schoolService = new SchoolService();
      schoolService.delete(school).then((response) =>
        toast.error(response.data.message, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
        })
      );
    }
  }

  function handleLanguageDelete(language) {
    var isConfirmed = window.confirm("Silmek istediğinize emin misiniz ?");
    if (isConfirmed) {
      let languageService = new LanguageService();
      languageService.delete(language).then((response) =>
        toast.error(response.data.message, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
        })
      );
    }
  }

  function handleSkillDelete() {}

  function handleWorkExperienceDelete() {}

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Container className="cvContainer">
          <Form className="ui form inverted">
            <FormField className="text-center">
              <Label
                size="massive"
                color="green"
                content="Özgeçmişi Güncelle"
              />
            </FormField>
            <FormGroup className="mt-4" widths="equal">
              <FormField>
                <HrmsTextInput
                  label="Github Hesap Linki"
                  name="githubAccountLink"
                  placeholder="Github Hesap Linkini Giriniz"
                  icon="linkify"
                  iconPosition="left"
                />
              </FormField>
              <FormField>
                <HrmsTextInput
                  label="LinkedIn Hesap Linki"
                  name="linkedinAccountLink"
                  placeholder="LinkedIn Hesap Linkini Giriniz"
                  icon="linkify"
                  iconPosition="left"
                />
              </FormField>
            </FormGroup>
            <FormGroup className="mt-4" widths="equal">
              <FormField>
                <HrmsTextArea
                  label="Ön Yazı"
                  name="coverLetter"
                  placeholder="Ön Yazı Giriniz"
                  style={{ minHeight: "225px", maxHeight: "225px" }}
                />
              </FormField>
            </FormGroup>
            <FormField className="text-center mt-4">
              <Button
                fluid
                size="big"
                color="green"
                type="submit"
                content="Kaydet"
              />
            </FormField>
          </Form>
          <Accordion
            inverted
            className="bg-dark border border-white mt-4"
            as={Menu}
            fluid
            vertical
          >
            <Menu.Item>
              <Accordion.Title
                className="text-white font-weight-bold"
                content="Okuduğu Okullar"
                active
                index={0}
              />
              <Accordion.Content className="text-white pt-4" active>
                <Table celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell singleLine>Okul Adı</Table.HeaderCell>
                      <Table.HeaderCell singleLine>Bölüm Adı</Table.HeaderCell>
                      <Table.HeaderCell singleLine>
                        Başladığı Yıl
                      </Table.HeaderCell>
                      <Table.HeaderCell singleLine>
                        Mezun Olduğu Yıl
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        style={{ width: "125px" }}
                      ></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {schools.map((school) => (
                      <Table.Row key={school.id}>
                        <Table.Cell verticalAlign="middle">
                          {school.schoolName}
                        </Table.Cell>
                        <Table.Cell verticalAlign="middle">
                          {!!school.departmentName
                            ? school.departmentName
                            : "-----"}
                        </Table.Cell>
                        <Table.Cell verticalAlign="middle">
                          {school.startYear}
                        </Table.Cell>
                        <Table.Cell verticalAlign="middle">
                          {school.graduationYear === 0
                            ? "-----"
                            : school.graduationYear}
                        </Table.Cell>
                        <Table.Cell verticalAlign="middle">
                          <Button
                            onClick={() => handleSchoolDelete(school)}
                            fluid
                            color="red"
                          >
                            Sil
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan="5">
                        {schoolActivityIndex === 0 ? (
                          <Button
                            style={{ width: "225px" }}
                            icon="add"
                            color="blue"
                            size="large"
                            floated="right"
                            content="Yeni Okul Ekle"
                            onClick={() => setSchoolActivityIndex(1)}
                          />
                        ) : (
                          <SchoolAdd
                            addSchool={() => setSchoolActivityIndex(0)}
                          />
                        )}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Accordion.Content>
            </Menu.Item>
            <Menu.Item>
              <Accordion.Title
                className="text-white font-weight-bold"
                content="Bildiği Diller"
                active
                index={1}
              />
              <Accordion.Content className="text-white pt-4" active>
                <Table celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell singleLine>Dil</Table.HeaderCell>
                      <Table.HeaderCell singleLine>
                        Dil seviyesi
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        style={{ width: "125px" }}
                      ></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {languages.map((language) => (
                      <Table.Row key={language.id}>
                        <Table.Cell verticalAlign="middle">
                          {language.language}
                        </Table.Cell>
                        <Table.Cell verticalAlign="middle">
                          <Rating
                            icon="star"
                            disabled
                            defaultRating={language.languageLevel}
                            maxRating={5}
                          />
                        </Table.Cell>
                        <Table.Cell verticalAlign="middle">
                          <Button
                            onClick={() => handleLanguageDelete(language)}
                            fluid
                            color="red"
                          >
                            Sil
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan="5">
                        {languagesActivityIndex === 0 ? (
                          <Button
                            style={{ width: "225px" }}
                            icon="add"
                            color="blue"
                            size="large"
                            floated="right"
                            content="Yeni Dil Ekle"
                            onClick={() => setLanguagesActivityIndex(1)}
                          />
                        ) : (
                          <LanguageAdd
                            addLanguage={() => setLanguagesActivityIndex(0)}
                          />
                        )}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Accordion.Content>
            </Menu.Item>
            <Menu.Item>
              <Accordion.Title
                className="text-white font-weight-bold"
                content="Yetenekleri"
                active
                index={2}
              />
              <Accordion.Content className="text-white pt-4" active>
                <Table celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell singleLine>
                        Program/Technoloji Adı
                      </Table.HeaderCell>
                      <Table.HeaderCell style={{ width: "125px" }} />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {skills.map((skill) => (
                      <Table.Row key={skill.id}>
                        <Table.Cell verticalAlign="middle">
                          {skill.programmingTechnologyName}
                        </Table.Cell>
                        <Table.Cell verticalAlign="middle">
                          <Button fluid color="red" content="Sil" />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan="5">
                        {skillsActivityIndex === 0 ? (
                          <Button
                            style={{ width: "225px" }}
                            icon="add"
                            color="blue"
                            size="large"
                            floated="right"
                            content="Yeni Yetenek Ekle"
                            onClick={() => setSkillsActivityIndex(1)}
                          />
                        ) : (
                          <SkillAdd
                            addSkill={() => setSkillsActivityIndex(0)}
                          />
                        )}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Accordion.Content>
            </Menu.Item>
            <Menu.Item>
              <Accordion.Title
                className="text-white font-weight-bold"
                content="İş Tecrübeleri"
                active
                index={3}
              />
              <Accordion.Content className="text-white pt-4" active>
                <Table celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell singleLine content="Şirket Adı" />
                      <Table.HeaderCell singleLine content="Pozisyon Adı" />
                      <Table.HeaderCell singleLine content="Başlama Yılı" />
                      <Table.HeaderCell singleLine content="Ayrılma Yılı" />
                      <Table.HeaderCell style={{ width: "125px" }} />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {workExperiences.map((workExperience) => (
                      <Table.Row key={workExperience.id}>
                        <Table.Cell verticalAlign="middle">
                          {workExperience.companyName}
                        </Table.Cell>
                        <Table.Cell verticalAlign="middle">
                          {workExperience.positionName}
                        </Table.Cell>
                        <Table.Cell verticalAlign="middle">
                          {workExperience.startYear}
                        </Table.Cell>
                        <Table.Cell verticalAlign="middle">
                          {!!workExperience.quitYear
                            ? workExperience.quitYear
                            : "-----"}
                        </Table.Cell>
                        <Table.Cell verticalAlign="middle">
                          <Button fluid color="red" content="Sil" />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan="5">
                        {workExperiencesActivityIndex === 0 ? (
                          <Button
                            style={{ width: "225px" }}
                            icon="add"
                            color="blue"
                            size="large"
                            floated="right"
                            content="Yeni İş Tecrübesi Ekle"
                            onClick={() => setWorkExperiencesActivityIndex(1)}
                          />
                        ) : (
                          <WorkExperienceAdd
                            addWorkExperience={() =>
                              setWorkExperiencesActivityIndex(0)
                            }
                          />
                        )}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Accordion.Content>
            </Menu.Item>
          </Accordion>
        </Container>
      </Formik>
    </div>
  );
}
