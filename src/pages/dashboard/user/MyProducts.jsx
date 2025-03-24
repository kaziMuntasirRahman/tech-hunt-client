import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteSweep } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import UpdateProduct from "./UpdateProduct";

const MyProducts = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext)
  const update_modal = document.getElementById('update_product_modal')
  const { data: myProducts = [], loading, refetch } = useQuery({
    queryKey: ['my-products'],
    queryFn: async () => {
      const response = await axiosSecure.get(`products/users/${user.email}`)
      return response.data
    }
  })

  const [updatingProduct, setUpdatingProduct] = useState({ _id: "", name: "", image: "", description: "", externalLinks: [], tags: [] })
  
  const openUpdateModal = (product) => {
    update_modal.showModal()
    // console.log(product)
    setUpdatingProduct(product)
  }

  const handleDeleteProduct = async (id) => {
    console.log("handle delete product function is called for the id:", id)
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    // const isConfirmed = confirm("Are you sure you want to delete this?")
    if (!result.isConfirmed) return;
    try {
      const response = await axiosSecure.delete(`/products/${id}`)
      console.log(response.data)
      if (response.data.deletedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Deleted!!!",
          footer: "The product has been deleted.",
          showConfirmButton: false,
          timer: 1500
        });
        refetch()
        const audio = new Audio('/assets/sound/success-1.mp3')
        audio.play()
      }
    } catch (err) {
      console.log(err)
    } finally {
      // console.log("Finally block inside handleDeleteProduct executed.")
    }
  }

  return (
    <div className="relative h-full flex p-8">
      {
        (loading) ?
          <div className="absolute left-0 top-0 !z-999 bg-slate-700/30 h-full w-full flex items-center justify-center">
            <span className="loader scale-200" />
          </div>
          :
          <></>
      }
      <div className="w-full rounded-2xl">
        <table className="table table-zebra rounded-2xl">
          {/* head */}
          <thead>
            <tr className="bg-gray-600 text-white font-semibold">
              <th>#</th>
              <th className="text-center">Name</th>
              <th className="text-center max-w-10">Upvotes</th>
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

                  <td className="text-center">{product?.status}</td>
                  {/* Update Button with Tooltip */}
                  <td className="text-lg text-blue-700">
                    <span className="tooltip w-full" data-tip={`Update ${product.name} product`}>
                      <GrUpdate onClick={() => openUpdateModal(product)} className="mx-auto cursor-pointer" />
                    </span>
                  </td>

                  {/* Delete Button with Tooltip */}
                  <td className="text-xl text-red-700">
                    <span className="w-full tooltip" data-tip={`Delete ${product.name} product`}>
                      <MdDeleteSweep onClick={() => handleDeleteProduct(product._id)} className="mx-auto cursor-pointer" />
                    </span>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      {/* update product modal */}
      <dialog id="update_product_modal" className="modal">
        <UpdateProduct product={updatingProduct} modal={update_modal} refresh={refetch} />
      </dialog>
    </div>
  );
};

export default MyProducts;