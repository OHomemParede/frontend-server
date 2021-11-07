import axios from "axios"
import dotenv from 'dotenv'

dotenv.config()

const url = `http://${process.env.API_URL}:${process.env.API_PORT}`  //|| "http://localhost:3100"

console.log('>>>', url)

export default axios.create({ baseURL: url});