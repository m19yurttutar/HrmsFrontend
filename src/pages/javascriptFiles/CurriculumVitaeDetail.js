import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Header,
  Table,
  Menu,
  Accordion,
  Image,
  Rating,
  Sticky,
  Button
} from "semantic-ui-react";
import CurriculumVitaeService from "../../services/CurriculumVitaeService";
import "../cssFiles/CurriculumVitae.css";

export default function CurriculumVitaeDetail() {
  let { id } = useParams();

  const [curriculumVitae, setCurriculumVitae] = useState({});

  const [schoolsIndex, setSchoolsIndex] = useState(0);
  const [languagesIndex, setLanguagesIndex] = useState(0);
  const [skillsIndex, setSkillsIndex] = useState(0);
  const [workExperiencesIndex, setWorkExperiencesIndex] = useState(0);
  const [connectionsIndex, setConnectionsIndex] = useState(0);

  useEffect(() => {
    let curriculumVitaeService = new CurriculumVitaeService();
    curriculumVitaeService
      .getByJobSeekerId(id)
      .then((response) => setCurriculumVitae(response.data.data))
      .catch();
  }, []);

  function handleSchoolsActivityIndex(params) {
    if (schoolsIndex === 0) {
      setSchoolsIndex(1);
    } else {
      setSchoolsIndex(0);
    }
  }

  function handleLanguagesActivityIndex(params) {
    if (languagesIndex === 0) {
      setLanguagesIndex(1);
    } else {
      setLanguagesIndex(0);
    }
  }

  function handleSkillsActivityIndex(params) {
    if (skillsIndex === 0) {
      setSkillsIndex(1);
    } else {
      setSkillsIndex(0);
    }
  }

  function handleWorkExperiencesActivityIndex(params) {
    if (workExperiencesIndex === 0) {
      setWorkExperiencesIndex(1);
    } else {
      setWorkExperiencesIndex(0);
    }
  }

  function handleConnectionsActivityIndex(params) {
    if (connectionsIndex === 0) {
      setConnectionsIndex(1);
    } else {
      setConnectionsIndex(0);
    }
  }

  return (
    <div>
      <Container className="cvContainer">
        <Grid>
          <Grid.Column width="12">
            <Header style={{ color: "white" }} textAlign="center" as="h1">
              {`${curriculumVitae.jobSeeker?.firstName} ${curriculumVitae.jobSeeker?.lastName}`}
            </Header>
            <p style={{ lineHeight: "2", textAlign: "justify" }}>
              {curriculumVitae.coverLetter}
            </p>
            <Accordion
              inverted
              className="bg-dark border border-white mt-5"
              as={Menu}
              fluid
              vertical
            >
              <Menu.Item>
                <Accordion.Title
                  className="text-white font-weight-bold"
                  content="Okuduğu Okullar"
                  active={schoolsIndex === 1}
                  onClick={handleSchoolsActivityIndex}
                  index={0}
                />
                <Accordion.Content
                  className="text-white pt-4"
                  active={schoolsIndex === 1}
                >
                  <Table celled padded>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell singleLine>Okul Adı</Table.HeaderCell>
                        <Table.HeaderCell singleLine>
                          Bölüm Adı
                        </Table.HeaderCell>
                        <Table.HeaderCell singleLine>
                          Başladığı Yıl
                        </Table.HeaderCell>
                        <Table.HeaderCell singleLine>
                          Mezun Olduğu Yıl
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {curriculumVitae.schools?.map((school) => (
                        <Table.Row key={school.id}>
                          <Table.Cell>{school.schoolName}</Table.Cell>
                          <Table.Cell>
                            {!!school.departmentName
                              ? school.departmentName
                              : "-----"}
                          </Table.Cell>
                          <Table.Cell>{school.startYear}</Table.Cell>
                          <Table.Cell>
                            {school.graduationYear === 0
                              ? "-----"
                              : school.graduationYear}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Accordion.Content>
              </Menu.Item>
              <Menu.Item>
                <Accordion.Title
                  className="text-white font-weight-bold"
                  content="Bildiği Diller"
                  active={languagesIndex === 1}
                  onClick={handleLanguagesActivityIndex}
                  index={1}
                />
                <Accordion.Content
                  className="text-white pt-4"
                  active={languagesIndex === 1}
                >
                  <Table celled padded>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell singleLine>Dil</Table.HeaderCell>
                        <Table.HeaderCell singleLine>
                          Dil seviyesi
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {curriculumVitae.languages?.map((language) => (
                        <Table.Row key={language.id}>
                          <Table.Cell>{language.language}</Table.Cell>
                          <Table.Cell>
                            <Rating
                              icon="star"
                              disabled
                              defaultRating={language.languageLevel}
                              maxRating={5}
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Accordion.Content>
              </Menu.Item>
              <Menu.Item>
                <Accordion.Title
                  className="text-white font-weight-bold"
                  content="Yetenekleri"
                  active={skillsIndex === 1}
                  onClick={handleSkillsActivityIndex}
                  index={2}
                />
                <Accordion.Content
                  className="text-white pt-4"
                  active={skillsIndex === 1}
                >
                  <Table celled padded>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell singleLine>
                          Program/Technoloji Adı
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {curriculumVitae.skills?.map((skill) => (
                        <Table.Row key={skill.id}>
                          <Table.Cell>
                            {skill.programmingTechnologyName}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Accordion.Content>
              </Menu.Item>
              <Menu.Item>
                <Accordion.Title
                  className="text-white font-weight-bold"
                  content="İş Tecrübeleri"
                  active={workExperiencesIndex === 1}
                  onClick={handleWorkExperiencesActivityIndex}
                  index={3}
                />
                <Accordion.Content
                  className="text-white pt-4"
                  active={workExperiencesIndex === 1}
                >
                  <Table celled padded>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell singleLine>
                          Şirket Adı
                        </Table.HeaderCell>
                        <Table.HeaderCell singleLine>
                          Pozisyon Adı
                        </Table.HeaderCell>
                        <Table.HeaderCell singleLine>
                          Başlama Yılı
                        </Table.HeaderCell>
                        <Table.HeaderCell singleLine>
                          Ayrılma Yılı
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {curriculumVitae.workExperiences?.map(
                        (workExperience) => (
                          <Table.Row key={workExperience.id}>
                            <Table.Cell>
                              {workExperience.companyName}
                            </Table.Cell>
                            <Table.Cell>
                              {workExperience.positionName}
                            </Table.Cell>
                            <Table.Cell>{workExperience.startYear}</Table.Cell>
                            <Table.Cell>
                              {!!workExperience.quitYear
                                ? workExperience.quitYear
                                : "-----"}
                            </Table.Cell>
                          </Table.Row>
                        )
                      )}
                    </Table.Body>
                  </Table>
                </Accordion.Content>
              </Menu.Item>
              <Menu.Item>
                <Accordion.Title
                  className="text-white font-weight-bold"
                  content="Bağlantılar"
                  active={connectionsIndex === 1}
                  onClick={handleConnectionsActivityIndex}
                  index={4}
                />
                <Accordion.Content
                  className="text-white pt-4"
                  active={connectionsIndex === 1}
                >
                  <Table celled padded>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell singleLine>
                          Github Hesabı
                        </Table.HeaderCell>
                        <Table.HeaderCell singleLine>
                          LinkedIn Hesabı
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          {!!curriculumVitae.connection?.githubAccountLink
                            ? curriculumVitae.connection?.githubAccountLink
                            : "-----"}
                        </Table.Cell>
                        <Table.Cell>
                          {!!curriculumVitae.connection?.linkedinAccountLink
                            ? curriculumVitae.connection?.linkedinAccountLink
                            : "-----"}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Accordion.Content>
              </Menu.Item>
            </Accordion>
          </Grid.Column>
          <Grid.Column width="4">
              <Image fluid src={curriculumVitae.jobSeeker?.profilePhoto.url} />
              <Button as={Link} to={`/curriculumVitae/update/${curriculumVitae.id}`} className="mt-4" fluid color="green" content="Özgeçmişi Düzenle"/>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
