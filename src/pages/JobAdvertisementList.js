import React, { useEffect, useState } from "react";
import {
  Item,
  ItemImage,
  Label,
  LabelGroup,
} from "semantic-ui-react";
import JobAdvertisementService from "../services/JobAdvertisementService";

function JobAdvertisementList() {
  const [jobAdvertisements, setJobAdvertisements] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getJobAdvertisements()
      .then((result) => setJobAdvertisements(result.data.data));
  }, []);

  return (
    <div>
      <Item.Group link>
        {jobAdvertisements.map((jobAdvertisement) => (
          <Item key={jobAdvertisement.id} className="bg-dark rounded px-3 py-3">
            <ItemImage className="pt-3" src={jobAdvertisement.employer.profilePhoto.url} />
            <Item.Content>
              <Item.Extra>
                <LabelGroup circular>
                  <Label attached="top right" color="green">{jobAdvertisement.releaseDate}</Label>
                </LabelGroup>
              </Item.Extra>
              <Item.Header as="a">
                <h3 className="ItemWriting">
                  {jobAdvertisement.jobPosition.jobPositionName}
                </h3>
              </Item.Header>
              <Item.Meta>
                <h5 className="ItemWriting">
                  {jobAdvertisement.employer.companyName}
                </h5>
              </Item.Meta>
              <Item.Description>
                <div className="ItemWriting">
                  {jobAdvertisement.jobDescription}
                </div>
              </Item.Description>
              <Item.Extra>
                <LabelGroup circular>
                  <Label color="blue">{jobAdvertisement.city.cityName}</Label>
                  <Label attached="bottom right" color="red">
                    {jobAdvertisement.applicationDeadline}
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

export default JobAdvertisementList;
