import { useState } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./molecules/navbar/navbar";
import Table from "./molecules/table/table";
import Cards from "./atoms/cards/cards";
import Register from "./pages/register/register";
import SearchWebsite from "./molecules/searchWebsite";

function App() {
	const [showRegister, setShowRegister] = useState(false);

	if (showRegister) {
		return <Register onSwitchToDashboard={() => setShowRegister(false)} />;
	}

	return (
		<>
			<Navbar />
			<Container style={{ marginTop: "7rem", padding: "2rem 0" }}>
				<SearchWebsite />
				<Cards items={[
					{ header: "12", description: "Active Projects", icon: "circle check" },
					{ header: "13", description: "Sut dig selv", icon: "chart bar" },
					{ header: "15", description: "Lorte pis", icon: "chart bar" },
					]} />
				<Table />
			</Container>
		</>
	);
}

export default App;
