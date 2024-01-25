import axios from 'axios'
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    config.headers['Authorization'] = `Bearer ${accessToken}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
/*
 * [ HTTP Status Code ]
 * BAD_REQUEST : 400
 * UNAUTHORIZED : 401
 * FORBIDDEN : 403
 * NOT_FOUND : 404
 * CONFLICT : 409
 * INTERNAL_SERVER_ERROR : 500
 * */
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response === 401) {
      
      alert(error.response?.data.errorMessage)
      
      
    }
    return Promise.reject(error)
  }
)
