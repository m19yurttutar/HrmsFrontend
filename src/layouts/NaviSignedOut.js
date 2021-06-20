import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import "./Navi.css";

export default function NaviSignedOut(props) {
  return (
    <div className="mx-2">
      <Button animated="vertical" color="grey" as={Link} to="/register">
        <Button.Content visible>Üye Ol</Button.Content>
        <Button.Content hidden>
          <Icon name="signup" />
        </Button.Content>
      </Button>
      <Button
        className="ml-4"
        animated="vertical"
        color="grey"
        onClick={props.signIn}
        as={Link}
        to="/login"
      >
        <Button.Content visible>Üye Girişi</Button.Content>
        <Button.Content hidden>
          <Icon name="sign-in" />
        </Button.Content>
      </Button>
    </div>
  );
}
