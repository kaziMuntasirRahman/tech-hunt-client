const ManageReports = () => {
  const loading = false;
  return (
    <div className="relative flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-semibold text-gray-600">Manage Reports Section is coming sooooon.... </h1>
      {loading && (
        <div className="absolute inset-0 bg-slate-700/30 flex items-center justify-center z-50">
          <span className="loader scale-200"></span>
        </div>
      )}
    </div>
  );
};

export default ManageReports;