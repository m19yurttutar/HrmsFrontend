import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Grid,
  GridRow,
  GridColumn,
  Container,
  Card,
  Image,
  Icon,
  Divider,
  Header,
  Sticky,
  List,
} from "semantic-ui-react";
import JobAdvertisementService from "../../services/JobAdvertisementService";
import "../cssFiles/JobAdvertisementDetail.css";

export default function JobAdvertisementDetail() {
  let { id } = useParams();

  const [jobAdvertisement, setJobAdvertisement] = useState({});

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getById(id)
      .then((result) => setJobAdvertisement(result.data.data))
      .catch(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid>
        <GridRow>
          <GridColumn width={12}>
            <Container className="jobAdvertisementDetailContainer">
              <Header textAlign="center" as="h1">
                {jobAdvertisement.employer?.companyName}
              </Header>
              <Container>
                <Header textAlign="left" as="h3">
                  İş Tanımı
                </Header>
                <p style={{ lineHeight: "2" }}>
                  {jobAdvertisement.jobDescription}
                </p>
              </Container>
              <Container className="jobDetailCardsContainer">
                <Card.Group className="mt-5 mb-4" itemsPerRow="1">
                  <Card>
                    <Card.Content>
                      <Grid centered>
                        <Grid.Column width="1">
                          <Icon size="big" name="info circle"></Icon>
                        </Grid.Column>
                        <Grid.Column width="6">
                          <h4 style={{ fontWeight: "bold" }}>
                            İş İlanı Detayları
                          </h4>
                        </Grid.Column>
                      </Grid>
                    </Card.Content>
                    <Card.Content className="pl-5">
                      <List>
                        <List.Item>
                          <Grid>
                            <List.Header
                              as={GridColumn}
                              width={5}
                              style={{ fontFamily: "cambria" }}
                            >
                              Çalışma Yeri:
                            </List.Header>
                            <List.Content width={11} as={GridColumn}>
                              {jobAdvertisement.city?.cityName}
                            </List.Content>
                          </Grid>
                        </List.Item>
                        <List.Item>
                          <Grid>
                            <List.Header
                              as={GridColumn}
                              width={5}
                              style={{ fontFamily: "cambria" }}
                            >
                              Kontenjan Sayısı:
                            </List.Header>
                            <List.Content width={11} as={GridColumn}>
                              {jobAdvertisement.vacantPositionCount}
                            </List.Content>
                          </Grid>
                        </List.Item>
                        <List.Item>
                          <Grid>
                            <List.Header
                              as={GridColumn}
                              width={5}
                              style={{ fontFamily: "cambria" }}
                            >
                              Ücret Aralığı:
                            </List.Header>
                            <List.Content width={11} as={GridColumn}>
                              {jobAdvertisement.minSalary} - {jobAdvertisement.maxSalary}
                            </List.Content>
                          </Grid>
                        </List.Item>
                        <List.Item>
                          <Grid>
                            <List.Header
                              as={GridColumn}
                              width={5}
                              style={{ fontFamily: "cambria" }}
                            >
                              Son Başvuru Tarihi:
                            </List.Header>
                            <List.Content width={11} as={GridColumn}>
                              {jobAdvertisement.applicationDeadline}
                            </List.Content>
                          </Grid>
                        </List.Item>
                      </List>
                    </Card.Content>
                  </Card>
                  <Card className="mt-5">
                    <Card.Content>
                      <Grid centered>
                        <Grid.Column width="1">
                          <Icon size="big" name="info circle"></Icon>
                        </Grid.Column>
                        <Grid.Column width="7">
                          <h4 style={{ fontWeight: "bold" }}>
                            İş Pozisyonu Detayları
                          </h4>
                        </Grid.Column>
                      </Grid>
                    </Card.Content>
                    <Card.Content className="pl-5">
                      <List>
                        <List.Item>
                          <Grid>
                            <List.Header
                              as={GridColumn}
                              width={5}
                              style={{ fontFamily: "cambria" }}
                            >
                              İş Pozisyonu:
                            </List.Header>
                            <List.Content width={11} as={GridColumn}>
                              {jobAdvertisement.jobPosition?.jobPositionName}
                            </List.Content>
                          </Grid>
                        </List.Item>
                        <List.Item>
                          <Grid>
                            <List.Header
                              as={GridColumn}
                              width={5}
                              style={{ fontFamily: "cambria" }}
                            >
                              Çalışma Türü:
                            </List.Header>
                            <List.Content width={11} as={GridColumn}>
                              {jobAdvertisement.workingType?.workingTypeName}
                            </List.Content>
                          </Grid>
                        </List.Item>
                        <List.Item>
                          <Grid>
                            <List.Header
                              as={GridColumn}
                              width={5}
                              style={{ fontFamily: "cambria" }}
                            >
                              Çalışma Zamanı:
                            </List.Header>
                            <List.Content width={11} as={GridColumn}>
                              {jobAdvertisement.workingTime?.workingTimeName}
                            </List.Content>
                          </Grid>
                        </List.Item>
                      </List>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Container>
            </Container>
          </GridColumn>
          <GridColumn width={4}>
            <Sticky>
              <Container className="jobAdvertisementDetailContainer">
                <Card>
                  <Image
                    src={jobAdvertisement.employer?.profilePhoto.url}
                    wrapped
                    ui={false}
                  />
                  <Card.Content>
                    <Card.Header>
                      {jobAdvertisement.employer?.companyName}
                    </Card.Header>
                    <Card.Description>
                      <Icon name="phone" />
                      {jobAdvertisement.employer?.phoneNumber}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra as={"a"}>
                    <Icon name="world" />
                    {jobAdvertisement.employer?.website}
                  </Card.Content>
                </Card>
                <Divider></Divider>
              </Container>
            </Sticky>
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}
