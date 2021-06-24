import axios from "axios";

export default class WorkExperienceService{
    getByJobSeekerId(jobSeekerId){
        return axios.get(`http://localhost:8080/api/workExperiences/getByJobSeekerIdSorted?jobSeekerId=${jobSeekerId}`)
    }

    add(workExperience){
        return axios.post("http://localhost:8080/api/workExperiences/add", workExperience)
    }

    delete(workExperience){
        return axios.delete("http://localhost:8080/api/workExperiences/delete", workExperience)
    }
}