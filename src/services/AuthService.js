import axios from "axios";

export default class AuthService{
    jobSeekerRegister(jobSeeker){
        return axios.post(`http://localhost:8080/api/auth/jobSeekerRegister`, jobSeeker)
    }

    employerRegister(employer){
        return axios.post(`http://localhost:8080/api/auth/employerRegister`, employer)
    }
}