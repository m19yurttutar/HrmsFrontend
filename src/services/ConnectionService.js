import axios from "axios";

export default class ConnectionService{
    getConnections(){
        return axios.get("http://localhost:8080/api/connections/getAll")
    }
}