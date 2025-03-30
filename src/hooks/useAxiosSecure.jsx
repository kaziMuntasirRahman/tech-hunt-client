import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({
  // baseURL: 'http://localhost:5000/',
  baseURL: 'https://tech-hunt-server-blond.vercel.app/',
})

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext)

  axiosSecure.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt_token')
    if(token){
      config.headers.Authorization = `bearer ${token}`
    } else{
      console.warn("Token not found, request might fail.")
    }
    // console.log("config",config)
    return config;
  }, (error)=>{
    return Promise.reject(error)
  })

  //*****/ This response interceptor runs after each response is received from the server.
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
     (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        console.log("Error code in the interceptor: ", status);
         logOut();
        window.location.href = '/'; 
      }
      return Promise.reject(error);
    }
  );

  return (axiosSecure);
};

export default useAxiosSecure;