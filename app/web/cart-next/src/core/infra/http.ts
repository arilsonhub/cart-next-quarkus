import axios from 'axios';

const serverURL = 'http://api:8080';
const clientURL = 'http://localhost:5201';
const baseUrl = typeof window === 'undefined' ? serverURL : clientURL;

export const http = axios.create({
    baseURL: baseUrl
});