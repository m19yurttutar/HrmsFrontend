import { Container, Image, Menu } from "semantic-ui-react";
import React, { useState } from "react";
import "./Navi.css";
import NaviSignedOut from "./NaviSignedOut";
import NaviSignedIn from "./NaviSignedIn";
import { Link } from "react-router-dom";

export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleSingOut() {
    setIsAuthenticated(false);
  }

  function handleSingIn() {
    setIsAuthenticated(false);
  }

  return (
    <div>
      <Menu className="Navi" stackable>
        <Container>
          <Menu.Item as={Link} to="/">
            <Image
              size="small"
              src="https://res.cloudinary.com/dxahez1o6/image/upload/v1623776939/LogoWhite_qxcm3w.png"
            />
          </Menu.Item>
          <Menu.Item as={Link} to="/">
            <h5 className="mx-3 font-weight-bold text-white">Ana Sayfa</h5>
          </Menu.Item>
          <Menu.Item as={Link} to="/findJob">
            <h5 className="mx-3 font-weight-bold text-white">İş Ara</h5>
          </Menu.Item>
          <Menu.Item as={Link} to="/jobPositions">
            <h5 className="mx-3 font-weight-bold text-white">Pozisyonlar</h5>
          </Menu.Item>
          <Menu.Menu position="right">
            {isAuthenticated ? (
              <NaviSignedIn signOut={handleSingOut} />
            ) : (
              <NaviSignedOut signIn={handleSingIn} />
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
