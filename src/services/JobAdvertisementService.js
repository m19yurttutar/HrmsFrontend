import axios from "axios";

export default class JobAdvertisementService {
  getAll() {
    return axios.get("http://localhost:8080/api/jobAdvertisements/getAll");
  }

  getById(id) {
    return axios.get(
      `http://localhost:8080/api/jobAdvertisements/getById?id=${id}`
    );
  }

  add(jobAdvertisement) {
    return axios.post(
      `http://localhost:8080/api/jobAdvertisements/add`,
      jobAdvertisement
    );
  }

  getUnconfirmedJobAdvertisement() {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisements/getUnconfirmedJobAdvertisement"
    );
  }

  getByActivityStatusAndConfirmationStatus(){
    return axios.get("http://localhost:8080/api/jobAdvertisements/getByActivityStatusAndConfirmationStatus")
  }

  update(jobAdvertisement){
    return axios.put(
      `http://localhost:8080/api/jobAdvertisements/update`,
      jobAdvertisement
    );
  }
}
