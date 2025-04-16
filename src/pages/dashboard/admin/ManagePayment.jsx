import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { SiTicktick } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
// const promote = new Audio('/assets/sound/upvote.wav')
// const demote = new Audio('/assets/sound/un_upvote.wav')

const ManagePayment = () => {
  // const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const [selectedUser, setSelectedUser] = useState({})

  const { data: paymentsInfo = [], isLoading, refetch } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const response = await axiosSecure.get('/payments')
      return response.data;
    }
  })


  const managePayments = async (state, id, email) => {
    console.log('....manage payments....', state)
    try {
      const response = await axiosSecure.patch('/payments', { status: state, _id: id , email})
      if (response?.data?.result?.modifiedCount > 0) {
        console.log(response.data);
        alert("Modified..")
        refetch()
      }
    } catch (error) {
      console.log(error);
    }
  }



  const showUserInfoModal = (user) => {
    setSelectedUser(user)
    const userModal = document.getElementById('user_info_modal')
    userModal.showModal()
  }

  return (
    <div className="relative h-full flex py-10 px-5 bg-white">

      <div className="overflow-x-auto w-full rounded-2xl">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="bg-gray-600 text-white font-semibold">
              <th>#</th>
              <th className="text-center">Email</th>
              <th className="text-center max-w-10">Amount</th>
              <th className="text-center">Payment Id</th>
              <th className="text-center">Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Accept</th>
              <th className="text-center">Reject</th>
            </tr>
          </thead>
          {isLoading && <SkeletonTable />}
          <tbody>

            {/* actual data */}
            {
              paymentsInfo.map((payment, index) =>
                <tr key={payment._id} className="hover:bg-gray-300/60 transition-all duration-100">
                  <th>{index + 1}</th>
                  <td className="text-center">
                    <p className="hover:underline cursor-pointer" onClick={() => showUserInfoModal(payment)}>
                      {payment.email}
                    </p>
                  </td>
                  <td className="text-center">${((payment.amount) / 100).toFixed(2)}</td>
                  <td className="text-center">{payment.payment_id}</td>
                  <td className="text-center">{new Date(payment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  <td className="text-center">{payment.status}</td>
                  {
                    payment?.status === 'pending' &&
                    <td className="text-center">
                      <span onClick={() => managePayments('accepted', payment._id, payment.email)} className="flex items-center justify-center text-xl text-green-600 cursor-pointer tooltip" data-tip="Accept Payment"><SiTicktick /></span>
                    </td>
                  }
                  {
                    payment?.status === 'pending' &&
                    <td className="text-center">
                      <span onClick={() => managePayments('rejected', payment._id, payment.email)} className="flex items-center justify-center text-xl text-red-500 cursor-pointer tooltip" data-tip="Reject Payment"><RxCross2 /></span>
                    </td>
                  }

                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      {/* user Info dialog modal */}
      <dialog id="user_info_modal" className="modal">
        <UserModal user={selectedUser} />
      </dialog>
    </div>
  );
};

export default ManagePayment;



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
          </tr>
        )
      }
    </tbody>
  )
}

const UserModal = ({ user }) => {
  const { name, email, photoURL, status, createdAt, isSubscribed, hasSubscription = false } = user;

  // Format the createdAt date
  const date = new Date(createdAt);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <>
      <div className="modal-box overflow-hidden bg-white rounded-lg shadow-2xl p-8 max-w-md mx-auto">
        {/* Close Button */}
        <form method="dialog" className="absolute top-4 right-4">
          <button className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </form>

        {/* User Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={photoURL}
            alt={name}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-md"
          />
        </div>

        {/* User Name */}
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">{name}</h3>

        {/* User Details */}
        <div className="space-y-4 text-gray-600">
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize">{status}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Joined:</span> {formattedDate}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Newsletter:</span>{" "}
            {isSubscribed ? "Subscribed" : "Not Subscribed"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Subscription:</span>{" "}
            {hasSubscription ? "Active" : "Inactive"}
          </p>
        </div>

        {/* Close Instruction */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Press ESC or click outside to close
        </p>
      </div>

      {/* Modal Backdrop */}
      <form method="dialog" className="modal-backdrop bg-black/50">
        <button>close</button>
      </form>
    </>
  );
};
