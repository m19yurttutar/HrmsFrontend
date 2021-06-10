import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Checkbox,
  Label,
  Input,
} from "semantic-ui-react";
import "../cssFiles/RegisterPage.css";
import GenderService from '../../services/GenderService'

const genderOptions = [];

export default function RegisterPage() {
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    let genderService = new GenderService();
    genderService
      .getGenders()
      .then((result) => setGenders(result.data.data));
  }, []);

  genders.forEach((gender) => {
    genderOptions.push({
      key: gender.id,
      value: gender.id,
      text: gender.genderName
    })
  })

  return (
    <div className="RegisterPage">
      <Segment>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Label color="blue" ribbon>
              <h3 className="Label">İş Arayan</h3>
            </Label>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="Ad"
                  placeholder="Ad"
                />
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="Soyad"
                  placeholder="Soyad"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  icon="calendar alternate"
                  iconPosition="left"
                  label="Doğum Tarihi"
                  placeholder="YYYY-AA-GG"
                />
                <Form.Select
                  fluid
                  label="Cinsiyet"
                  options={genderOptions}
                  placeholder="Cinsiyet"
                />
              </Form.Group>
              <Form.Input
                icon="vcard"
                iconPosition="left"
                label="T.C. Kimlik Numarası"
                placeholder="T.C. Kimlik Numarası"
              />
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
                <Checkbox label="Hizmet sözleşmesini onaylıyorum." />
              </Form.Field>
              <Form.Field>
                <Checkbox label="İletişim bilgilerime e-posta gönderilmesine izin veriyorum." />
              </Form.Field>
              <Form.Field>
                <Checkbox label="Bilgilerimi Açık Rıza Metni'nde belirtilen şekilde işlenmesine onay veriyorum." />
              </Form.Field>
              <Button attached="bottom" content="KAYDOL" primary />
            </Form>
          </Grid.Column>

          <Grid.Column>
            <Label color="red" ribbon="right">
              <h3 className="Label">İş Veren</h3>
            </Label>
            <Form>
              <Form.Input
                icon="building"
                iconPosition="left"
                label="Şirket Adı"
                placeholder="Şirket Adı"
              />
              <Form.Input label="Website">
                <Input label="http://" placeholder="www.hrms.com" />
              </Form.Input>
              <Form.Input
                icon="phone"
                iconPosition="left"
                label="Telefon Numarası"
                placeholder="000-000-0000"
              />
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
                <Checkbox label="Hizmet sözleşmesini onaylıyorum." />
              </Form.Field>
              <Form.Field>
                <Checkbox label="İletişim bilgilerime e-posta gönderilmesine izin veriyorum." />
              </Form.Field>
              <Form.Field>
                <Checkbox label="Bilgilerimi Açık Rıza Metni'nde belirtilen şekilde işlenmesine onay veriyorum." />
              </Form.Field>
              <Button attached="bottom" content="KAYDOL" color="red" />
            </Form>
          </Grid.Column>
        </Grid>
        <Divider vertical>Ya da</Divider>
      </Segment>
    </div>
  );
}