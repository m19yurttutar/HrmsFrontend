import axios from "axios";

export default class LanguageService{
    getByJobSeekerIdSorted(jobSeekerId){
        return axios.get(`http://localhost:8080/api/languages/getByJobSeekerIdSorted?jobSeekerId=${jobSeekerId}`)
    }

    add(language){
        return axios.post("http://localhost:8080/api/languages/add", language)
    }

    delete(language){
        return axios.delete("http://localhost:8080/api/languages/delete", language)
    }
}