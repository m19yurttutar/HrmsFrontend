import {
  Button,
  Container,
  Icon,
  IconGroup,
  Menu,
} from "semantic-ui-react";
import React from "react";

function Navi() {
  return (
    <div>
      <Menu className="bg-dark" fixed="top" stackable>
        <Container>
          <Menu.Menu position="left">
            <Menu.Item>
              <IconGroup>
                <Icon name="male" size="big" className="text-white"></Icon>
                <Icon name="female" size="big" className="ml-4 text-white"></Icon>
              </IconGroup>
              <h3 className="mr-4 pr-2 font-weight-bold ml-5 text-white">HRMS</h3>
            </Menu.Item>
            <Menu.Item>
              <h5 className="mx-3 font-weight-bold text-white">İş Ara</h5>
            </Menu.Item>
            <Menu.Item><h5 className="mx-3 font-weight-bold text-white">Pozisyonlar</h5></Menu.Item>
          </Menu.Menu>

          <Menu.Menu position="right">
            <Menu.Item>
              <Button color="grey">Üye Ol</Button>
            </Menu.Item>
            <Menu.Item>
              <Button color="grey">Üye Girişi</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}

export default Navi;
