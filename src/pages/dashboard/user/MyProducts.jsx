import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FcDeleteColumn } from "react-icons/fc";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteSweep } from "react-icons/md";

const MyProducts = () => {
  const axiosPublic = useAxiosPublic()
  const { user } = useContext(AuthContext)
  const { data: myProducts = [], loading } = useQuery({
    queryKey: ['my-products'],
    queryFn: async () => {
      const response = await axiosPublic.get(`products/users/${user.email}`)
      return response.data
    }
  })

  return (
    <div className="relative h-full flex p-8">
      {
        (loading) ?
          <div className="absolute left-0 top-0 !z-999 bg-slate-700/30 h-full w-full flex items-center justify-center">
            <span className="loader scale-200" ></span>
          </div>
          :
          <></>
      }
      <div className="overflow-x-auto  w-full rounded-2xl">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th className="text-center">Name</th>
              <th className="text-center">Upvotes</th>
              <th className="text-center">Status</th>
              <th className="text-center">Update</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              // TODO: Change this to myProducts array after adding product
              // Array(10).fill(10).map((product,index) =>
              myProducts.map((product, index) =>
                <tr key={product._id} className="hover:bg-gray-100/30 transition-all duration-200">
                  <th>{index + 1}</th>
                  <td className="text-left">{product?.name}</td>
                  <td className="text-center">{product?.upvotes.length}</td>
                  <td>{product?.status}</td>
                  <td className="text-lg text-blue-700"><GrUpdate className="mx-auto" /></td>
                  <td className="text-xl text-red-700"><MdDeleteSweep className="mx-auto" /></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;