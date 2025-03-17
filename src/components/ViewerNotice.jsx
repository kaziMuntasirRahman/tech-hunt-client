const ViewerNotice = ({notify, button}) => {
  return (
    <div className="w-full h-10 bg-[#47CD89] absolute left-0 flex justify-center items-center ">
      <p className="text-white font-bold">{notify}&nbsp;</p>
      <button className="bg-white text-black font-semibold rounded px-1">{button}</button>
    </div>
  );
};

export default ViewerNotice;