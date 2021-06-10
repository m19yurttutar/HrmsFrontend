import React from "react";
import "../cssFiles/LoginPage.css";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  GridColumn,
  GridRow,
  Image,
  Checkbox
} from "semantic-ui-react";

export default function LoginPage() {
  return (
    <div>
      <Grid>
        <GridRow className="GridColumn rounded p-4">
          <GridColumn width={10} verticalAlign="middle">
            <Image
              size="large"
              src="https://res.cloudinary.com/dxahez1o6/image/upload/v1623258217/logo512_olqgub.png"
            />
          </GridColumn>
          <GridColumn width={6} verticalAlign="middle">
            <Segment placeholder>
              <Form className="mt-4">
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
                <Button
                  className="mt-3"
                  attached="bottom"
                  content="Üye Girişi"
                  primary
                />
              </Form>
              <Divider className="mt-4" horizontal content="Ya da" />
              <Button
                className="my-5"
                content="Üye Ol"
                icon="signup"
                size="big"
              />
            </Segment>
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}
