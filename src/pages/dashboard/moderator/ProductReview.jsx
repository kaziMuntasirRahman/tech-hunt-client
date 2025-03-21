import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useProducts from "../../../hooks/useProducts";
import { Link } from "react-router-dom";
const promote = new Audio('/assets/sound/upvote.wav')
const demote = new Audio('/assets/sound/un_upvote.wav')

const statusOrder = ['pending', 'rejected', 'approved']

const ProductReview = () => {
  const { isLoading, products:originalProducts=[], refetch } = useProducts()
  const axiosPublic = useAxiosPublic()
  const [products,setProducts] = useState([])

  useEffect(() => {
    if(originalProducts){
      const sorted = [...originalProducts].sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status))
      setProducts(sorted)
    }
  }, [originalProducts])

  const switchFeaturedProduct = async (id) => {
    console.log("switch featured product function is called for the id no: ", id)
    try {
      const response = await axiosPublic.patch(`products/${id}/featured`)
      console.log(response.data)
      if (response.data.result.modifiedCount > 0) {
        console.log("data modified")
        refetch()
        if (response.data.newFeaturedStatus === true) {
          promote.play()
        } else {
          demote.play()
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      console.log("Finally Block inside switchFeatureProduct has been executed.")
    }
  }

  const handleProductStatus = async (id, bool) => {
    console.log("Handle Product Status function is called for the id no:", id, "to", bool)
    try {
      const response = await axiosPublic.patch(`products/${id}/status`, { status: bool })
      console.log(response.data)
      if (response.data.modifiedCount > 0) {
        console.log("data modified")
        refetch()
        if (bool) {
          promote.play()
        } else {
          demote.play()
        }
      }

    } catch (err) {
      console.log(err)
    } finally {
      console.log("Finally Block inside handleProductStatus has been executed.")
    }
  }



  return (
    <div className="relative h-full flex py-10 px-5 bg-white">
      {/* {
        (isLoading) ?
          <div className="absolute left-0 top-0 !z-999 bg-slate-700/30 h-full w-full flex items-center justify-center">
            <span className="loader scale-200" ></span>
          </div>
          :
          <></>
      } */}
      <div className="overflow-x-auto w-full rounded-2xl">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="bg-gray-600 text-white font-semibold">
              <th>#</th>
              <th className="text-center">Name</th>
              <th className="text-center max-w-10">Owner</th>
              <th className="text-center">Make Featured</th>
              <th className="text-center">Accept</th>
              <th className="text-center">Reject</th>
            </tr>
          </thead>
          {isLoading && <SkeletonTable />}
          <tbody>

            {/* actual data */}
            {
              products.map((product, index) =>
                <tr key={product._id} className="hover:bg-gray-300/60 transition-all duration-100">
                  <th>{index + 1}</th>
                  <td><Link to={`/products/${product._id}`} className="text-left hover:underline"> {product?.name}</Link></td>
                  <td className="text-center">{product?.productOwner.name}</td>
                  <td className="flex justify-center">
                    {product.isFeatured ?
                      <button
                        onClick={() => switchFeaturedProduct(product._id)}
                        className="btn btn-sm bg-green-50 tooltip"
                        data-tip="Remove From Featured"
                      >Featured
                      </button>
                      :
                      <button
                        onClick={() => switchFeaturedProduct(product._id)}
                        className="btn btn-sm bg-green-300 border-none tooltip"
                        data-tip="Make This Product As Featured">
                        Make Featured
                      </button>
                    }
                  </td>
                  <td className="text-center">
                    {
                      product.status === 'approved' ?
                        <button className="border border-gray-200 rounded px-2 py-1 tooltip" data-tip="This product is Approved">Approved</button>
                        :
                        <button onClick={() => handleProductStatus(product._id, true)} className="btn btn-sm btn-info border-none tooltip" data-tip="Approve This Product">Approve</button>
                    }
                  </td>
                  <td className="text-center">
                    {
                      product.status === 'rejected' ?
                        <button className="border border-gray-200 rounded px-2 py-1 tooltip" data-tip="This Product is Rejected">Rejected</button>
                        :
                        <button onClick={() => handleProductStatus(product._id, false)} className="btn btn-sm btn-error border-none tooltip" data-tip="Reject This Product">Reject</button>
                    }
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReview;

const SkeletonTable = () => {
  return (
    <tbody>
      {
        Array(15).fill(15).map((_, index) =>
          <tr key={index} className="hover:bg-gray-300/60 transition-all duration-100">
            <th>{index + 1}</th>
            <td className=""><p className="skeleton h-5" /></td>
            <td className=""><p className="skeleton h-5" /></td>
            <td className=""><p className="skeleton h-5" /></td>
            <td className=""><p className="skeleton h-5" /></td>
            <td className=""><p className="skeleton h-5" /></td>
          </tr>)
      }
    </tbody>
  )
}