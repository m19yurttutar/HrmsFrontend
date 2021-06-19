import axios from "axios";

export default class JobAdvertisementConfirmationService{
    
    update(jobAdvertisementConfirmation){
        return axios.put("http://localhost:8080/api/jobAdvertisementConfirmations/update", jobAdvertisementConfirmation)
    }
}