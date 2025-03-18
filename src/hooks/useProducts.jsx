import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = () => {
  const axiosPublic = useAxiosPublic()
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    enabled: true,
    queryFn: async () => {
      const response = await axiosPublic.get('/products')
      return response.data;
    }
  })
  return ({ products });
};

export default useProducts;