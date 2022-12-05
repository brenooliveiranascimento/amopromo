import axios from "axios";

export const airportApiConnection = axios.create({
  baseURL: 'http://stub.2xt.com.br/air/airports/pzrvlDwoCwlzrWJmOzviqvOWtm4dkvuc',
});

export const baseHeader = {
  headers: { Authorization: 'Basic ZGVtbzpzd252bEQ=' }
}
