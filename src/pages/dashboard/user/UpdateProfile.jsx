import { useContext, useState } from "react";
import useGetStatus from "../../../hooks/useGetStatus";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`

const UpdateProfile = () => {
  const { user, updateUserInfo } = useContext(AuthContext)
  const axiosPublic = useAxiosPublic()
  const { userInfo } = useGetStatus()
  const [updatedUser, setUpdatedUser] = useState({ name: "", photo: null })
  const [updateLoading, setUpdateLoading] = useState(false)

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setUpdateLoading(true)
    console.log(updatedUser)
    try {
      let imgFile;
      let imgURL = user?.photoURL || "";
      if (updatedUser.photo) {
        imgFile = { image: updatedUser.photo }
        const response = await axios.post(img_hosting_url, imgFile, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        if (response.data.success) {
          console.log("Profile Photo uploaded...")
          imgURL = response.data.data.url;
          console.log(imgURL)
        }
      }

      const res = await updateUserInfo(updatedUser.name, imgURL)
      const updatedUserInfo = { name: updatedUser.name || user.displayName, photoURL: imgURL };
      if (res) {
        const dbResponse = await axiosPublic.patch(`users/profile/${user.email}`, updatedUserInfo)
        console.log(dbResponse)
        if (dbResponse.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your profile has been updated.",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }

    } catch (err) {
      return console.log(err)
    } finally {
      setUpdateLoading(false)
      console.log("Finally block inside handleUpdateProfile executed")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-xl text-center pb-6">Update Your Profile Info</h1>
      <form onSubmit={handleUpdateProfile} className="fieldset relative py-10 px-5 border-r border-b shadow-lg rounded-2xl overflow-hidden">
        {
          (updateLoading) ?
            <div className="absolute left-0 top-0 !z-999 bg-slate-700/30 h-full w-full flex items-center justify-center">
              <span className="loader scale-200" ></span>
            </div>
            :
            <></>
        }
        <label className="fieldset-label">Name</label>
        <input
          type="name"
          className="input"
          placeholder="enter your name"
          defaultValue={userInfo.name}
          onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
          required
        />

        {/* photo input field */}
        <label className="fieldset-label">Profile Photo</label>
        <input
          type="file"
          className="file-input file-input-neutral"
          onChange={(e) => setUpdatedUser({ ...updatedUser, photo: e.target.files[0] })}
        />
        <button type="submit" className="btn btn-neutral mt-4">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;