import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useGetStatus = () => {
  const { user, loading } = useContext(AuthContext)
  const axiosPublic = useAxiosPublic()

  const { data: status = null } = useQuery({
    queryKey: ['status', user?.email],
    enabled: Boolean(user && !loading),
    queryFn: async () => {
      const response = await axiosPublic.get(`/users/${user.email}`)
      return response.data.status
    }
  })

  useEffect(() => {
    console.log("Current user's Status:", status)
  }, [status])


  return ({ status });
};

export default useGetStatus;