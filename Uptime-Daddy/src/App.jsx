import "./App.css";
import { useState } from "react";
import { Container, Button } from "semantic-ui-react";
import Navbar from "./molecules/navbar/navbar";
import Table from "./molecules/table/table";
import Cards from "./atoms/cards/cards";
import Register from "./molecules/register/register";

function App() {
	const [showRegister, setShowRegister] = useState(false);

	if (showRegister) {
		return <Register onSwitchToDashboard={() => setShowRegister(false)} />;
	}

	return (
		<>
			<Navbar />
			<Container style={{ marginTop: "7rem", padding: "2rem 0" }}>
				<Button primary onClick={() => setShowRegister(true)} style={{ marginBottom: "1.25rem" }}>
					Open Register Page
				</Button>
				<Cards />
				<Table />
			</Container>
		</>
	);
}

export default App;
