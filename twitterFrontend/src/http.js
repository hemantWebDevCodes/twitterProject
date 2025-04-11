import axios from "axios";

const getHeader = () => {
   //  const token = localStorage.getItem('api_token');
   const token = sessionStorage.getItem('api_token');
    return {
        'Authorization' : `Bearer ${token}`,
        "Content-Type" : 'application/json'
    } 
 }

 const http = axios.create({
    baseURL : 'http://localhost:8000/api',
    headers : getHeader(),
 });

 http.interceptors.request.use(config => {
    config.headers = getHeader();
    return config;
 })

export default http;