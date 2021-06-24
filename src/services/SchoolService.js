import axios from "axios";

export default class SchoolService{
    getByJobSeekerIdSorted(jobSeekerId){
        return axios.get(`http://localhost:8080/api/schools/getByJobSeekerIdSorted?jobSeekerId=${jobSeekerId}`)
    }

    add(school){
        return axios.post("http://localhost:8080/api/schools/add", school)
    }

    delete(school){
        return axios.delete("http://localhost:8080/api/schools/delete", school)
    }
}