import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const promote = new Audio('/assets/sound/upvote.wav')
// const demote = new Audio('/assets/sound/un_upvote.wav')

const ManageUser = () => {
  const axiosPublic = useAxiosPublic()

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosPublic.get('/users')
      return response.data;
    }
  })

  const promoteToModerator = async (id) => {
    console.log("Promote to Moderator request received for the user:", id)
    try {
      const response = await axiosPublic.patch(`/users/${id}/moderator`)
      console.log(response.data)
      if (response.data.modifiedCount > 0) {
        console.log("User status updated")
        refetch()
        promote.play()
      }
    } catch (error) {
      console.log(error)
    } finally {
      console.log("Finally block executed inside promotedToModerator.")
    }
  }


  const promoteToAdmin = async (id) => {
    console.log("Promote to Admin request received for the user:", id)
    try {
      const response = await axiosPublic.patch(`/users/${id}/admin`)
      console.log(response.data)
      if (response.data.modifiedCount > 0) {
        console.log("User status updated")
        refetch()
        promote.play()
      }
    } catch (error) {
      console.log(error)
    } finally {
      console.log("Finally block executed inside promotedToAdmin.")
    }
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
              <th className="text-center max-w-10">Email</th>
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
                    <p className="hover:underline cursor-pointer" onClick={() => document.getElementById('user_info_modal').showModal()}>
                      {user.name}
                    </p>
                  </td>
                  <td className="text-center">
                    <p className="hover:underline cursor-pointer" onClick={() => document.getElementById('user_info_modal').showModal()}>
                      {user.email}
                    </p>
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
      <dialog id="user_info_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">User info are coming....</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
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
            <td className=""><p className="skeleton h-5" /></td>
          </tr>)
      }
    </tbody>
  )
}

const UserModal = ({ user }) => {
  const { name, email, photoURL, status, createdAt, isSubscribed, hasSubscription = false } = user;
  console.log(name, email, photoURL, status, createdAt, isSubscribed, hasSubscription)
  return (
    <dialog id="user_info_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}