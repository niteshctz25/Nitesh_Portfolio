const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading portfolio data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
