import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useGetStatus = () => {
  const { user, loading=true } = useContext(AuthContext)
  // const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()

  const { data: userInfo = { name: "N/A", email: "N/A", photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJmTbHk3RuI0Kgy27sl4Xaie1EMV3haRrYGw&s", createAt: "", isSubscribed: "N/A", status: "N/A" }, isLoading } = useQuery({
    queryKey: ['user-info', user?.email],
    enabled: Boolean(user?.email) && !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${user.email}`)
      return response.data
    }
  })

  useEffect(() => {
    if (userInfo?.status)
      console.log("User Status:", userInfo.status)
  }, [userInfo?.status])


  return ({ status: userInfo?.status, userInfo, isLoading });
};

export default useGetStatus;