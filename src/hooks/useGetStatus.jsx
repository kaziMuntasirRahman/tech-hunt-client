import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useGetStatus = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Only run the query if the user is present and loading is false
  const { data: userInfo = { name: "N/A", email: "N/A", photoURL: "https://i.ibb.co.com/9HDjyqRt/668781-200.png", createAt: "", isSubscribed: "N/A", status: "N/A" }, isLoading } = useQuery({
    queryKey: ['user-info', user?.email],
    enabled: Boolean(user?.email) && !loading, // Conditionally enable the query
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${user.email}`);
      return response.data;
    },
    refetchOnWindowFocus: false, // Optional: to prevent automatic refetch on window focus
  });

  useEffect(() => {
    if (userInfo?.status) {
      console.log("User Status:", userInfo.status);
    }
  }, [userInfo?.status]);

  // If the query isn't enabled, userInfo and isLoading will have default values.
  return { status: userInfo?.status, userInfo, isLoading: isLoading || loading };
};

export default useGetStatus;
