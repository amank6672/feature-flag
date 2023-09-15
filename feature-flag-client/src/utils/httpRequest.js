import axios from 'axios';


const createHttpRequest = axios.create({
    baseURL: 'http://localhost:5000/api/v1/'
});

export default createHttpRequest;