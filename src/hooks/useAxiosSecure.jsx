import axios from "axios";

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000/',
  // baseURL: 'https://tech-hunt-server-blond.vercel.app/',
})

const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt_token')
    config.headers.Authorization = `bearer ${token}`
    // console.log("config",config)
    return config;
  })

  return (axiosSecure);
};

export default useAxiosSecure;