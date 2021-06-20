import axios from "axios";

export default class JobAdvertisementService {
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

  getUnconfirmedJobAdvertisements() {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisements/getUnconfirmedJobAdvertisements"
    );
  }

  getActiveJobAdvertisements(){
    return axios.get("http://localhost:8080/api/jobAdvertisements/getActiveJobAdvertisements")
  }

  update(jobAdvertisement){
    return axios.put(
      `http://localhost:8080/api/jobAdvertisements/update`,
      jobAdvertisement
    );
  }
}
