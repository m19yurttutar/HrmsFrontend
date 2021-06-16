import React from "react";
import "../cssFiles/LoginPage.css";
import {
  Divider,
  Form,
  Grid,
  Container,
  Image,
  Checkbox,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <Container className="loginPageContainer" as={Grid} columns="2">
        <Grid.Column>
          <center>
            <Image
              className="mt-2"
              size="large"
              src="https://res.cloudinary.com/dxahez1o6/image/upload/v1623777355/LogoSquareBlack_x8o8yz.png"
            ></Image>
          </center>
        </Grid.Column>
        <Grid.Column className="loginFormContainer">
          <Container className="mt-3">
            <Form>
              <Form.Input
                icon="at"
                iconPosition="left"
                label="E-posta"
                placeholder="E-posta"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Şifre"
                placeholder="Şifre"
                type="password"
              />
              <Form.Field>
                <Checkbox label="Oturumumu açık tut" />
              </Form.Field>
              <Form.Button
                size="big"
                className="text-center"
                content="Üye Girişi"
                primary
              />
              <Divider className="mt-4" horizontal content="Ya da" />
              <Link to="/register">
              <Form.Button
                className="loginPageSignUpButton"
                content="Üye Ol"
                icon="signup"
                size="big"
                primary
              />
              </Link>
            </Form>
          </Container>
        </Grid.Column>
      </Container>
    </div>
  );
}