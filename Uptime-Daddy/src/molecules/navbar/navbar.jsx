import "./style.css";

function Navbar() {
	return (
		<>
			<header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
				<div className="px-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<span className="text-lg font-bold text-slate-900 dark:text-slate-100">Uptime Daddy</span>
						</div>
						<div className="flex items-center gap-4">
							<button className="rounded-md bg-slate-200 dark:bg-slate-700 px-3 py-1 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">Dashboard</button>
							<button className="rounded-md bg-slate-200 dark:bg-slate-700 px-3 py-1 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">Settings</button>
							<button
								className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
								onClick={() => {
									const nextDark = !document.documentElement.classList.contains("dark")
									document.documentElement.classList.toggle("dark", nextDark)
									localStorage.setItem("theme", nextDark ? "dark" : "light")
								}}
							>
								Toggle Theme
							</button>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

export default Navbar;
