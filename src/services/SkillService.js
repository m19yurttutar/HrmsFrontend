import axios from "axios";

export default class SkillService{
    getByJobSeekerId(jobSeekerId){
        return axios.get(`http://localhost:8080/api/skills/getByJobSeekerIdSorted?jobSeekerId=${jobSeekerId}`)
    }
    
    add(skill){
        return axios.post("http://localhost:8080/api/skills/add", skill)
    }

    delete(skill){
        return axios.delete("http://localhost:8080/api/skills/delete", skill)
    }
}