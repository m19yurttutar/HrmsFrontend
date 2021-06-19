import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Item,
  ItemImage,
  Label,
  LabelGroup,
  Menu,
} from "semantic-ui-react";
import JobAdvertisementService from "../../services/JobAdvertisementService";
import "../cssFiles/JobAdvertisementList.css";

export default function JobAdvertisementList() {
  const [jobAdvertisements, setJobAdvertisements] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getByActivityStatusAndConfirmationStatus()
      .then((result) => setJobAdvertisements(result.data.data))
      .catch();
  }, []);

  return (
    <div>
      <Item.Group>
        <Menu className="bg-dark" stackable>
          <Grid.Column>
            <Menu.Item className="MenuItemHeader" header>
              <div className="MenuItemHeader">Sırala</div>
            </Menu.Item>
          </Grid.Column>
          <Grid.Column style={{ width: "225px" }}>
            <Menu.Item className="MenuItem" link>
              Maaş bilgisine göre
            </Menu.Item>
          </Grid.Column>
          <Grid.Column style={{ width: "230px" }}>
            <Menu.Item className="MenuItem" link>
              Eklenme tarihine göre
            </Menu.Item>
          </Grid.Column>
          <Grid.Column style={{ width: "260px" }}>
            <Menu.Item className="MenuItem" link>
              Son başvuru tarihine göre
            </Menu.Item>
          </Grid.Column>
        </Menu>
        {jobAdvertisements.map((jobAdvertisement) => (
          <Item
            key={jobAdvertisement.id}
            className="bg-dark rounded px-3 py-3"
            as={Link}
            to={`jobAdvertisements/${jobAdvertisement.id}`}
          >
            <ItemImage
              className="pt-3"
              src={jobAdvertisement.employer?.profilePhoto.url}
            />
            <Item.Content>
              <Item.Extra>
                <LabelGroup circular>
                  <Label attached="top right" color="red">
                    {jobAdvertisement.applicationDeadline}
                  </Label>
                </LabelGroup>
              </Item.Extra>
              <Item.Header>
                <h3 className="ItemWriting">
                  {jobAdvertisement.jobPosition?.jobPositionName}
                </h3>
              </Item.Header>
              <Item.Meta>
                <h5 className="ItemWriting">
                  {jobAdvertisement.employer?.companyName}
                </h5>
              </Item.Meta>
              <Item.Description>
                <div className="JobSummaryDiv">
                  {jobAdvertisement.jobSummary}
                </div>
              </Item.Description>
              <Item.Extra>
                <LabelGroup className="JobAdvertisementLabel" circular>
                  <Label attached="bottom left" color="blue">
                    {jobAdvertisement.city.cityName}
                  </Label>
                  <Label attached="bottom right" color="green">
                    {jobAdvertisement.releaseDate}
                  </Label>
                </LabelGroup>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </div>
  );
}
