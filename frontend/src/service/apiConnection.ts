import axios from "axios"; 

export const serviceConnection = axios.create({
  baseURL: 'http://localhost:3001/'
});
