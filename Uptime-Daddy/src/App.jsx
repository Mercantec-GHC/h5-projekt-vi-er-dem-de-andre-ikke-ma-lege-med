import "./App.css";
import Navbar from "./molecules/navbar/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <p className="text-xs text-slate-500 dark:text-slate-400">Monitorede Websites</p>
            <p className="text-3xl font-semibold text-slate-800 dark:text-white mt-2">0</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <p className="text-xs text-slate-500 dark:text-slate-400">Nede websites</p>
            <p className="text-3xl font-semibold text-slate-800 dark:text-white mt-2">37</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <p className="text-xs text-slate-500 dark:text-slate-400">Pending Deliverables</p>
            <p className="text-3xl font-semibold text-slate-800 dark:text-white mt-2">8</p>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center text-sm text-slate-400">
          <span id="resultText"></span>
        </div>
      </div>
    </>
  );
}


export default App;
