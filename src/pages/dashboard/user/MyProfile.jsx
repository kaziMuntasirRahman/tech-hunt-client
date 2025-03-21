import useGetStatus from "../../../hooks/useGetStatus";

const MyProfile = () => {
  const { loading, userInfo } = useGetStatus();
  const { name = "", email, photoURL, createdAt, isSubscribed, status } = userInfo;
  const date = new Date(createdAt);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <div className="relative flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      {loading && (
        <div className="absolute inset-0 bg-slate-700/30 flex items-center justify-center z-50">
          <span className="loader scale-200"></span>
        </div>
      )}

      {/* Profile Picture and Name */}
      <div className="relative mb-8">
        <img
          src={photoURL}
          alt="Profile"
          className="rounded-full size-80 object-cover border-4 border-white shadow-lg"
        />
        <h1 className="absolute bottom-0 w-full text-center pb-4 text-white text-4xl font-bold bg-gray-600/70 rounded-b-full">
          {name}
        </h1>
      </div>

      {/* User Details Card */}
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <p className="text-lg mb-4">
          <span className="font-semibold">Email:</span> {email}
        </p>
        <p className="text-lg mb-4">
          <span className="font-semibold">Newsletter Subscriber:</span>{" "}
          {isSubscribed ? "Yes" : "No"}
        </p>
        <p className="text-lg mb-4">
          <span className="font-semibold">User Status:</span>{" "}
          {status.toUpperCase()}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Created At:</span> {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default MyProfile;