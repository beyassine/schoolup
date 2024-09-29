import axios from "axios";

var localbase = 'http://127.0.0.1:8000'


const axiosInstance = axios.create({
    baseURL: localbase,
});

export default axiosInstance