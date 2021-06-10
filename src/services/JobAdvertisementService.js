import axios from "axios";

export default class JobAdvertisementService{
    getAll(){
        return axios.get("http://localhost:8080/api/jobAdvertisements/getAll")
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/jobAdvertisements/getById?id=${id}`)
    }
}