import React, { useEffect, useState } from "react";
import {
  Divider,
  Form,
  Grid,
  Segment,
  Checkbox,
  Label,
  Input,
} from "semantic-ui-react";
import "../cssFiles/RegisterPage.css";
import AuthService from "../../services/AuthService";
import GenderService from "../../services/GenderService";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const jobSeeker = {
    firstName: null,
    lastName: null,
    genderId: null,
    nationalIdentityNumber: null,
    birthDate: null,
    email: null,
    password: null,
    confirmPassword: null,
  };

  const employer = {
    companyName: null,
    website: null,
    phoneNumber: null,
    email: null,
    password: null,
    confirmPassword: null,
  };

  const [genders, setGenders] = useState([]);

  useEffect(() => {
    let genderService = new GenderService();
    genderService
      .getGenders()
      .then((result) => setGenders(result.data.data))
      .catch();
  }, []);

  var genderOptions = genders.map(function (gender) {
    return { key: gender.id, text: gender.genderName, value: gender.id };
  });

  function handleJobSeekerRegister() {
    var authService = new AuthService();
    authService
      .jobSeekerRegister(jobSeeker)
      .then(function (response) {
        if (!response.data.success) {
          toast.error(response.data.message, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.success("Kayıt Başarıyla Gerçekeşti.", {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
      .catch();
  }

  function handleEmployerRegister() {
    var authService = new AuthService();
    authService
      .employerRegister(employer)
      .then(function (response) {
        if (!response.data.success) {
          toast.error(response.data.message, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.success("Kayıt Başarıyla Gerçekleşti.", {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
      .catch();
  }

  return (
    <div className="RegisterPage">
      <Segment className="bg-dark">
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Label color="blue" ribbon>
              <h3 className="Label">İş Arayan</h3>
            </Label>
            <Form inverted onSubmit={handleJobSeekerRegister} className="mt-2">
              <Form.Group widths="equal">
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="Ad"
                  placeholder="Ad"
                  required
                  onChange={(e) => (jobSeeker.firstName = e.target.value)}
                />
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="Soyad"
                  placeholder="Soyad"
                  required
                  onChange={(e) => (jobSeeker.lastName = e.target.value)}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  icon="calendar alternate"
                  iconPosition="left"
                  label="Doğum Tarihi"
                  placeholder="YYYY-AA-GG"
                  required
                  onChange={(e) => (jobSeeker.birthDate = e.target.value)}
                />
                <Form.Select
                  label="Cinsiyet"
                  options={genderOptions}
                  placeholder="Cinsiyet"
                  required
                  onChange={(e, data) => (jobSeeker.genderId = data.value)}
                />
              </Form.Group>
              <Form.Input
                icon="vcard"
                iconPosition="left"
                label="T.C. Kimlik Numarası"
                placeholder="T.C. Kimlik Numarası"
                required
                onChange={(e) =>
                  (jobSeeker.nationalIdentityNumber = e.target.value)
                }
              />
              <Form.Input
                icon="at"
                iconPosition="left"
                label="E-posta"
                placeholder="E-posta"
                required
                onChange={(e) => (jobSeeker.email = e.target.value)}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Şifre"
                placeholder="Şifre"
                type="password"
                required
                onChange={(e) => (jobSeeker.password = e.target.value)}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Şifre Tekrarı"
                placeholder="Şifre Tekrarı"
                type="password"
                required
                onChange={(e) => (jobSeeker.confirmPassword = e.target.value)}
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
              <Form.Button fluid content="İş Arayan Olarak Kaydol" primary />
            </Form>
          </Grid.Column>

          <Grid.Column>
            <Label color="red" ribbon="right">
              <h3 className="Label">İş Veren</h3>
            </Label>
            <Form inverted onSubmit={handleEmployerRegister} className="mt-2">
              <Form.Input
                name="companyName"
                icon="building"
                iconPosition="left"
                label="Şirket Adı"
                placeholder="Şirket Adı"
                required
                onChange={(e) => (employer.companyName = e.target.value)}
              />
              <Form.Input label="Website" required>
                <Input
                  label="http://"
                  placeholder="www.hrms.com"
                  onChange={(e) =>
                    (employer.website = `http://${e.target.value}`)
                  }
                />
              </Form.Input>
              <Form.Input
                icon="phone"
                iconPosition="left"
                label="Telefon Numarası"
                placeholder="000-000-0000"
                required
                onChange={(e) => (employer.phoneNumber = e.target.value)}
              />
              <Form.Input
                icon="at"
                iconPosition="left"
                label="E-posta"
                placeholder="E-posta"
                required
                onChange={(e) => (employer.email = e.target.value)}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Şifre"
                placeholder="Şifre"
                type="password"
                required
                onChange={(e) => (employer.password = e.target.value)}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Şifre Tekrarı"
                placeholder="Şifre Tekrarı"
                type="password"
                required
                onChange={(e) => (employer.confirmPassword = e.target.value)}
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
              <Form.Button
                fluid
                content="İş Veren Olarak Kaydol"
                color="red"
              />
            </Form>
          </Grid.Column>
        </Grid>
        <Divider inverted vertical>Ya da</Divider>
      </Segment>
    </div>
  );
}
