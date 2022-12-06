import axios from "axios"

export const mockAirlineApi = axios.create({
  baseURL: 'http://stub.2xt.com.br/air/search/pzrvlDwoCwlzrWJmOzviqvOWtm4dkvuc'
})
