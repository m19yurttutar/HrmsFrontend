import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
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
      .getActiveJobAdvertisements()
      .then((result) => setJobAdvertisements(result.data.data))
      .catch();
  }, []);

  return (
    <div>
      <Menu inverted className="bg-dark">
        <Menu.Item className="MenuItem">
          Sırala
        </Menu.Item>
        <Menu.Item className="MenuItem" link>
          Maaş bilgisine göre
        </Menu.Item>
        <Menu.Item className="MenuItem" link>
          Eklenme tarihine göre
        </Menu.Item>
        <Menu.Item className="MenuItem" link>
          Son başvuru tarihine göre
        </Menu.Item>
      </Menu>
      <Item.Group>
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
