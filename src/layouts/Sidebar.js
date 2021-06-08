import React, { Component } from "react";
import { Accordion, Menu, Button, Icon } from "semantic-ui-react";
import CityFilter from "./CityFilter";
import EmployerFilter from "./EmployerFilter";
import JobPositionFilter from "./JobPositionFilter";

export default class Sidebar extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <div>
        <Accordion className="bg-dark" as={Menu} fluid vertical>
          <Menu.Item>
            <Accordion.Title
              className="text-white font-weight-bold"
              content="Şehirler"
              active={activeIndex === 0}
              onClick={this.handleClick}
              index={0}
            />
            <Accordion.Content
              className="text-white"
              active={activeIndex === 0}
            >
              <CityFilter />
            </Accordion.Content>
          </Menu.Item>

          <Menu.Item>
            <Accordion.Title
              className="text-white font-weight-bold"
              content="İş Pozisyonları"
              active={activeIndex === 1}
              onClick={this.handleClick}
              index={1}
            />
            <Accordion.Content
              className="text-white"
              active={activeIndex === 1}
            >
              <JobPositionFilter />
            </Accordion.Content>
          </Menu.Item>

          <Menu.Item>
            <Accordion.Title
              className="text-white font-weight-bold"
              content="Şirketler"
              active={activeIndex === 2}
              onClick={this.handleClick}
              index={2}
            />
            <Accordion.Content
              className="text-white"
              active={activeIndex === 2}
            >
              <EmployerFilter />
            </Accordion.Content>
          </Menu.Item>
        </Accordion>
        <Button className="bg-dark text-white" fluid>Filtrele</Button>
      </div>
    );
  }
}
