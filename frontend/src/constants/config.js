export const API_NOTIFICATION_MESSAGES ={
   loading :{
    title: "Loading ..",
    message: "Data is bein loaded plz wait"
   },
   success: {
    title: 'Success',
    message: 'Data successfully loaded'
   },
   responseFailure: {
    title: 'Error',
    message: 'An Error occured while fetching response from server. Plz try again'
   },
   requestFailure: {
    title: "Error",
    message: "An Error occured while parsing request data"
   },
   networkError: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    }
}

//API SERVICE CALL

export const SERVICE_URLS = {
    userSignup : {url: '/signup', method: 'POST'}
}