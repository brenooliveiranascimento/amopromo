import axios from "axios"; 

export const serviceConnection = axios.create({
  baseURL: 'https://backend-production-9ab0.up.railway.app/'
});
