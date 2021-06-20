import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  Button,
  Grid,
  GridColumn,
  GridRow,
  Item,
  Label,
  LabelGroup,
} from "semantic-ui-react";
import JobAdvertisementConfirmationService from "../../services/JobAdvertisementConfirmationService";
import JobAdvertisementService from "../../services/JobAdvertisementService";
import "../cssFiles/UnconfirmedJobAdvertisementList.css";
import Sidebar from "./Sidebar";

export default function UnconfirmedJobAdvertisementList() {
  const [unconfirmedJobAdvertisements, setUnconfirmedJobAdvertisements] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getUnconfirmedJobAdvertisements()
      .then((response) => setUnconfirmedJobAdvertisements(response.data.data))
      .catch();
  }, []);

  function handleJobAdvertisementConfirmation(unconfirmedJobAdvertisement) {
    let jobAdvertisementConfirmationService =
      new JobAdvertisementConfirmationService();

    jobAdvertisementConfirmationService
      .update({
        jobAdvertisementId: unconfirmedJobAdvertisement.id,
        confirmationStatus: true,
      })
      .then(function (response) {
        if (response.data.success) {
          toast.success(
            `${unconfirmedJobAdvertisement.id} id numarasına sahip iş ilanı onaylandı.`,
            {
              position: "bottom-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
            }
          );
          setUnconfirmedJobAdvertisements(
            unconfirmedJobAdvertisements.filter(
              (j) => j.id !== unconfirmedJobAdvertisement.id
            )
          );
        } else {
          toast.error(
            `${unconfirmedJobAdvertisement.id} id numarasına sahip iş ilanı onaylanırken bir sorun meydana geldi!.`,
            {
              position: "bottom-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
            }
          );
        }
      });
  }

  function handleJobAdvertisementRefusal(unconfirmedJobAdvertisement) {
    let jobAdvertisementConfirmationService =
      new JobAdvertisementConfirmationService();

    jobAdvertisementConfirmationService
      .update({
        jobAdvertisementId: unconfirmedJobAdvertisement.id,
        confirmationStatus: false,
      })
      .then(function () {
        toast.success(
          `${unconfirmedJobAdvertisement.id} id numarasına sahip iş ilanı reddedildi.`,
          {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
          }
        );
        setUnconfirmedJobAdvertisements(
          unconfirmedJobAdvertisements.filter(
            (j) => j.id !== unconfirmedJobAdvertisement.id
          )
        );
      });
  }

  return (
    <div>
      <Grid>
        <GridRow>
          <GridColumn width={12}>
            <Item.Group>
              {unconfirmedJobAdvertisements.map(
                (unconfirmedJobAdvertisement) => (
                  <Item
                    key={unconfirmedJobAdvertisement.id}
                    className="bg-dark rounded px-3 py-3"
                  >
                    <Item.Image
                      className="pt-3"
                      src={
                        unconfirmedJobAdvertisement.employer?.profilePhoto.url
                      }
                    />
                    <Item.Content>
                      <Item.Extra>
                        <LabelGroup circular>
                          <Label attached="top right" color="red">
                            {unconfirmedJobAdvertisement.applicationDeadline}
                          </Label>
                        </LabelGroup>
                      </Item.Extra>
                      <Item.Header
                        as={Link}
                        to={`/jobAdvertisements/${unconfirmedJobAdvertisement.id}`}
                      >
                        <h3 className="ItemWriting">
                          {
                            unconfirmedJobAdvertisement.jobPosition
                              ?.jobPositionName
                          }
                        </h3>
                      </Item.Header>
                      <Item.Meta>
                        <h5 className="ItemWriting">
                          {unconfirmedJobAdvertisement.employer?.companyName}
                        </h5>
                      </Item.Meta>
                      <Item.Description>
                        <div className="JobSummaryDiv">
                          {unconfirmedJobAdvertisement.jobSummary}
                        </div>
                      </Item.Description>
                      <Item.Extra>
                        <LabelGroup className="JobAdvertisementLabel" circular>
                          <Label attached="bottom left" color="blue">
                            {unconfirmedJobAdvertisement.city?.cityName}
                          </Label>
                          <Label attached="bottom right" color="green">
                            {unconfirmedJobAdvertisement.releaseDate}
                          </Label>
                        </LabelGroup>
                      </Item.Extra>
                      <Card.Content extra>
                        <Button.Group fluid>
                          <Button
                            onClick={() =>
                              handleJobAdvertisementConfirmation(
                                unconfirmedJobAdvertisement
                              )
                            }
                            color="green"
                          >
                            Onayla
                          </Button>
                          <Button.Or />
                          <Button
                            onClick={() =>
                              handleJobAdvertisementRefusal(
                                unconfirmedJobAdvertisement
                              )
                            }
                            color="red"
                          >
                            Reddet
                          </Button>
                        </Button.Group>
                      </Card.Content>
                    </Item.Content>
                  </Item>
                )
              )}
            </Item.Group>
          </GridColumn>
          <GridColumn width={4}>
            <Sidebar />
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}
