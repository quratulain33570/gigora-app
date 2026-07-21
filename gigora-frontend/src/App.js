function App() {
  return (
    <div className="min-h-screen bg-lightBlue flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center border border-gray-100">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Gigora App 🚀
        </h1>
        <p className="text-grayText mb-6">
          Tailwind CSS is connected and working!
        </p>
        <button className="bg-primary hover:bg-navy text-white font-semibold px-6 py-2.5 rounded-lg transition duration-200 shadow-md">
          Setup Complete!
        </button>
      </div>
    </div>
  );
}

export default App;
