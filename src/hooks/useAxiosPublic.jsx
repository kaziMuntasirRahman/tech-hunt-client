import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: 'http://localhost:5000/',
  baseURL: 'https://tech-hunt-server-blond.vercel.app/',
})

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;