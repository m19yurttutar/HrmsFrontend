import axios from "axios";

export default class SchoolService{
    getSchool(){
        return axios.get("http://localhost:8080/api/schools/getAll")
    }
}