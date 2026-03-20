import "./style.css";
import { Menu, Container, Button } from "semantic-ui-react";

function Navbar() {
	return (
		<Menu fixed="top" inverted>
			<Container>
				<Menu.Item header>Uptime Daddy</Menu.Item>
				<Menu.Menu position="right">
					<Menu.Item>
						<Button compact>Dashboard</Button>
					</Menu.Item>
					<Menu.Item>
						<Button compact>Settings</Button>
					</Menu.Item>
				</Menu.Menu>
			</Container>
		</Menu>
	);
}

export default Navbar;
