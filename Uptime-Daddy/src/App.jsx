import { useState,useEffect} from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./molecules/navbar/navbar";
import Table from "./molecules/table/table";
import Cards from "./atoms/cards/cards";
import Register from "./pages/register/register";
import SearchWebsite from "./molecules/searchWebsite";
import { getAuthPayload, getAuthHeaders } from "./util/auth";
import { API_URL, fetchCall } from "./util/api.jsx";
import Loader from "./atoms/loader/loader.jsx";

function App() {
	const [showRegister, setShowRegister] = useState(false);
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);


	function calculateCards(amountOfWebsites, amountOfMeasurements) {
		let totalMeasurements = 0;
		let totalSitesUp = 0;
		if (Array.isArray(amountOfMeasurements)) {
			for (const item of amountOfMeasurements) {
				if (item && Array.isArray(item.measurements)) {
					totalMeasurements += item.measurements.length;
					const latest = item.measurements[item.measurements.length - 1];
					if (latest && (latest.status === 200 || latest.statusCode === 200 || latest.status === "200")) {
						totalSitesUp += 1;
					}
				}
			}
		}

		const uptimePercent = Array.isArray(amountOfMeasurements) && amountOfMeasurements.length > 0
			? Math.round((totalSitesUp / amountOfMeasurements.length) * 100): 0;

		return [
			{header: amountOfWebsites.length, description: "Active Projects", icon: "circle check"},
			{header: totalMeasurements, description: "Total Checks", icon: "chart bar"},
			{header: `${uptimePercent}%`, description: "Uptime %", icon: "chart bar"},
		];
	}

	if (showRegister) {
		return <Register onSwitchToDashboard={() => setShowRegister(false)} />;
	}

		const authPayload = getAuthPayload();
        const userId = authPayload?.userId;
		
		useEffect(() => {
			if (!userId) return;

			const loadData = async () => {
				try {
					setLoading(true);
					const [amountOfWebsites, amountOfMeasurements] = await Promise.all([
					fetchCall({ url:`${API_URL}/Websites/user/${userId}`, headers: getAuthHeaders() }),
					fetchCall({ url:`${API_URL}/Websites/user/${userId}/with-measurements`, headers: getAuthHeaders() }),
				]);
					setCards(calculateCards(amountOfWebsites, amountOfMeasurements));
				} catch (err) {
					setError(err);
				} finally {
					setLoading(false);
				}
			};

		loadData();
		}, [userId]);

	return (
		<>
			<Navbar />
			<Container style={{ marginTop: "7rem", padding: "2rem 0" }}>
				<Loader isLoading={loading} text="Fetching ping data..." />
				<SearchWebsite />
				<Cards items={cards} />
				<Table />
			</Container>
		</>
	);
}

export default App;
