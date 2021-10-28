import axios from "axios"

const url = "https://backend-server-exemplo-em-node.herokuapp.com" 
const local = "http://localhost:3100"

export default axios.create({ baseURL: local});