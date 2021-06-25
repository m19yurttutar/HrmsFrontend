import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Item,
  ItemImage,
  Label,
  LabelGroup,
  Menu,
  Container,
  Header,
  Button,
} from "semantic-ui-react";
import JobAdvertisementService from "../../services/JobAdvertisementService";
import "../cssFiles/JobAdvertisementList.css";
import HrmsPagination from "../../utilities/pagination/HrmsPagination";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { addToFavorites } from "../../store/actions/favoritesActions";
import { toast } from "react-toastify";

export default function Home() {
  const dispatch = useDispatch()
  const [jobAdvertisements, setJobAdvertisements] = useState([]);
  const [filteredJobAdvertisements, setFilteredJobAdvertisements] = useState(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [jobAdvertisementsPerPage, setJobAdvertisementsPerPage] = useState(10);

  const indexOfLastJobAdvertisement = currentPage * jobAdvertisementsPerPage;

  const indexOfFirstJobAdvertisement =
    indexOfLastJobAdvertisement - jobAdvertisementsPerPage;

  const currentJobAdvertisements = filteredJobAdvertisements.slice(
    indexOfFirstJobAdvertisement,
    indexOfLastJobAdvertisement
  );

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getActiveJobAdvertisements()
      .then((response) => {
        setJobAdvertisements(response.data.data);
        setFilteredJobAdvertisements(response.data.data);
      })
      .catch();
  }, []);

  const paginate = (activePage) => setCurrentPage(activePage);

  const handleFilter = (filterValues) => {
    if (
      !!filterValues.cityId |
      !!filterValues.jobPositionId |
      !!filterValues.employerId
    ) {
      setFilteredJobAdvertisements(
        jobAdvertisements.filter((j) =>
          !!filterValues.cityId
            ? j.city.id === filterValues.cityId
            : j.city.id !== filterValues.cityId && !!filterValues.jobPositionId
            ? j.jobPosition.id === filterValues.jobPositionId
            : j.jobPosition.id !== filterValues.jobPositionId &&
              !!filterValues.employerId
            ? j.employer.id === filterValues.employerId
            : j.employer.id !== filterValues.employerId
        )
      );
    } else {
      setFilteredJobAdvertisements(jobAdvertisements);
    }
  };

  const handleAddToFavorites = (jobAdvertisement) => {
    dispatch(addToFavorites(jobAdvertisement));
    toast.success(`${jobAdvertisement.employer?.companyName} favorilere eklendi!`, {
      position: "bottom-right",
      autoClose: 5000,
    });
  };

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Menu inverted className="bg-dark">
              <Menu.Item className="MenuItem">Sırala</Menu.Item>
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
            {currentJobAdvertisements.length > 0 ? (
              <Item.Group>
                {currentJobAdvertisements.map((jobAdvertisement) => (
                  <Item
                    key={jobAdvertisement.id}
                    className="bg-dark rounded px-3 py-3"
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
                      <Item.Header
                        as={Link}
                        to={`jobAdvertisements/${jobAdvertisement.id}`}
                      >
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
                          <Label
                            icon="star"
                            size="large"
                            attached="bottom right"
                            color="green"
                            content="Favorilere Ekle"
                            as={Button}
                            onClick={() => handleAddToFavorites(jobAdvertisement)}
                          />
                        </LabelGroup>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                ))}
                <HrmsPagination
                  totalJobAdvertisements={jobAdvertisements.length}
                  jobAdvertisementsPerPage={jobAdvertisementsPerPage}
                  setJobAdvertisementsPerPage={(jobAdvertisementsPerPage) =>
                    setJobAdvertisementsPerPage(jobAdvertisementsPerPage)
                  }
                  paginate={paginate}
                />
              </Item.Group>
            ) : (
              <Container className="cvContainer text-center">
                <Header className="text-white" content="İş İlanı Bulunamadı" />
              </Container>
            )}
          </Grid.Column>
          <Grid.Column width={4}>
            <Sidebar handleFilter={handleFilter} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
