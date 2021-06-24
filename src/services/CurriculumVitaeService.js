import axios from "axios";

export default class CurriculumVitaeService{
    getCurriculumVitaes(){
        return axios.get("http://localhost:8080/api/curriculumVitaes/getAll")
    }

    getByJobSeekerId(jobSeekerId){
        return axios.get(`http://localhost:8080/api/curriculumVitaes/getByJobSeekerId?jobSeekerId=${jobSeekerId}`)
    }

    update(curriculumVitae){
        return axios.put(`http://localhost:8080/api/curriculumVitaes/update`, curriculumVitae)
    }
}