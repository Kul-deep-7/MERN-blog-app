import axios from "axios"
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config.js"

const API_URL = 'https://mern-blog-app-ef2s.onrender.com' //baxkend url

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type" : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function(error){
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function(error){
        return Promise.reject(processError(error))
    }
)

// api.js - Fix the processResponse function

const processResponse = (response) => {
    if (response?.status === 200 || response?.status === 201) {
        return { 
            isSuccess: true, 
            data: response.data 
        }
    } else {
        // Extract error message from response data
        const errorData = response.data || {};
        return {
            isFailure: true,
            isError: true, // Add this for consistency
            status: response?.status,
            msg: errorData.message || errorData.msg || 'Something went wrong',
            code: response?.status, // Use status code as code
            data: errorData // Pass entire error object for detailed handling
        }
    }
}

const processError = (error) => {
    if (error.response) {
        console.log("Error in response:", error.response.data);
        // Extract server error message from response data
        const serverError = error.response.data || {};
        return {
            isError: true,
            isFailure: true,
            msg: serverError.message || serverError.msg || API_NOTIFICATION_MESSAGES.responseFailure.message,
            code: error.response.status,
            data: serverError // Pass server error details
        }
    } else if (error.request) {
        console.log("Error in request:", error.toJSON());
        return {
            isError: true,
            isFailure: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure.message,
            code: ""
        }
    } else {
        console.log("Error in network:", error.toJSON());
        return {
            isError: true,
            isFailure: true,
            msg: API_NOTIFICATION_MESSAGES.networkError.message,
            code: ""
        }
    }
}
const API = {}

for (const [key, value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showUploadProgress(percentageCompleted)
                }
            },
             onDownloadProgress: function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted)
                }
            }
        })
    }

export { API }
