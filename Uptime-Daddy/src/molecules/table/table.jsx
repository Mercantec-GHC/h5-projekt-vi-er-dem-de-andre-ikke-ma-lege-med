import "./style.css";

function Table() {
	return (
		<>
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider">
						<tr>
							<th className="px-8 py-4 text-left">Engineer</th>
							<th className="px-8 py-4 text-left">Project</th>
							<th className="px-8 py-4 text-left">Technology</th>
							<th className="px-8 py-4 text-left">Delivery Date</th>
							<th className="px-8 py-4 text-left">Status</th>
							<th className="px-8 py-4 text-right">Links</th>
						</tr>
					</thead>

					<tbody id="tableBody" className="divide-y divide-slate-200 dark:divide-slate-700">
						<tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
							<td className="px-8 py-6 flex items-center gap-4">
								<div className="w-10 h-10 rounded-full bg-indigo-200 dark:bg-indigo-700 flex items-center justify-center font-semibold text-indigo-700 dark:text-indigo-100">
									AP
								</div>
								<div>
									<p className="font-medium text-slate-100">Ayyam Perumal</p>
									<p className="text-xs text-slate-400">Senior Mobile Architect</p>
								</div>
							</td>

							<td className="px-8 py-6 text-slate-300">Ride Sharing Platform</td>
							<td className="px-8 py-6 text-slate-300">React Native · FastAPI</td>
							<td className="px-8 py-6 text-slate-300">15 Aug 2026</td>

							<td className="px-8 py-6">
								<span className="px-3 py-1 text-xs rounded-full bg-emerald-900 text-emerald-200 font-medium">
									In Progress
								</span>
							</td>

							<td className="px-8 py-6 text-right flex justify-end gap-3">
								<a
									href="https://www.ayyamperumal.online/"
									target="_blank"
									className="px-3 py-1 text-xs bg-indigo-700 text-indigo-100 rounded-md hover:bg-indigo-600"
								>
									Portfolio
								</a>

								<a
									href="https://games.ayyamperumal.online/"
									target="_blank"
									className="px-3 py-1 text-xs bg-purple-700 text-purple-100 rounded-md hover:bg-purple-600"
								>
									Games
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Table;