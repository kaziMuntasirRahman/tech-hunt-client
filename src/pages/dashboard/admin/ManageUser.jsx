import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const promote = new Audio('/assets/sound/upvote.wav')
const demote = new Audio('/assets/sound/un_upvote.wav')

const userRole = ['Admin', 'moderator', 'general'];

const ManageUser = () => {
  // const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const [selectedUser, setSelectedUser] = useState({})

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosSecure.get('/users')
      const sortedUser = response.data.sort((a, b) => userRole.indexOf(a.status) - userRole.indexOf(b.status))
      return sortedUser;
    }
  })


  const demoteToUser = async (id) => {
    // console.log("Demote to User request received for the user:", id)
    try {
      const response = await axiosSecure.patch(`users/${id}/status/general`)
      // console.log(response.data)
      if (response.data.modifiedCount > 0) {
        console.log("User status updated")
        refetch()
        demote.play()
      }
    } catch (error) {
      console.log(error)
    } finally {
      // console.log("Finally block executed inside promotedToModerator.")
    }
  }
  const promoteToModerator = async (id) => {
    // console.log("Promote to Moderator request received for the user:", id)
    try {
      const response = await axiosSecure.patch(`users/${id}/status/moderator`)
      // console.log(response.data)
      if (response.data.modifiedCount > 0) {
        console.log("User status updated")
        refetch()
        promote.play()
      }
    } catch (error) {
      console.log(error)
    } finally {
      // console.log("Finally block executed inside promotedToModerator.")
    }
  }


  const promoteToAdmin = async (id) => {
    console.log("Promote to Admin request received for the user:", id)
    try {
      const response = await axiosSecure.patch(`users/${id}/status/admin`)
      // console.log(response.data)
      if (response.data.modifiedCount > 0) {
        console.log("User status updated")
        refetch()
        promote.play()
      }
    } catch (error) {
      console.log(error)
    } finally {
      // console.log("Finally block executed inside promotedToAdmin.")
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
              <th className="text-center">Name</th>
              <th className="text-center max-w-10">Make User</th>
              <th className="text-center">Make Moderator</th>
              <th className="text-center">Make Admin</th>
            </tr>
          </thead>
          {isLoading && <SkeletonTable />}
          <tbody>

            {/* actual data */}
            {
              users.map((user, index) =>
                <tr key={user._id} className="hover:bg-gray-300/60 transition-all duration-100">
                  <th>{index + 1}</th>
                  <td className="text-center">
                    <p className="hover:underline cursor-pointer" onClick={() => showUserInfoModal(user)}>
                      {user.name}
                    </p>
                  </td>

                  <td className="text-center">
                    {
                      user.status === 'general' ?
                        <button className="border border-gray-200 rounded px-2 py-1 tooltip" data-tip="This user is a General User">An User</button>
                        :
                        <button onClick={() => demoteToUser(user._id)} className="btn btn-sm btn-primary border-none tooltip" data-tip="Demote To User">Make User</button>
                    }
                  </td>

                  <td className="text-center">
                    {
                      user.status === 'moderator' ?
                        <button className="border border-gray-200 rounded px-2 py-1 tooltip" data-tip="This user is a Moderator">A Moderator</button>
                        :
                        <button onClick={() => promoteToModerator(user._id)} className="btn btn-sm btn-info border-none tooltip" data-tip="Promote To Moderator">Make Moderator</button>
                    }
                  </td>
                  <td className="text-center">
                    {
                      user.status === 'admin' ?
                        <button className="border border-gray-200 rounded px-2 py-1 tooltip" data-tip="This user is an Admin">An Admin</button>
                        :
                        <button onClick={() => promoteToAdmin(user._id)} className="btn btn-sm btn-error border-none tooltip" data-tip="Promote To Admin">Make Admin</button>
                    }
                  </td>
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

export default ManageUser;



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
          </tr>)
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
