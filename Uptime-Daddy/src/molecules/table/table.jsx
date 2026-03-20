import "./style.css";
import { Table, Label, Button } from "semantic-ui-react";

function TableComponent() {
	return (
		<Table celled selectable>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Engineer</Table.HeaderCell>
					<Table.HeaderCell>Project</Table.HeaderCell>
					<Table.HeaderCell>Technology</Table.HeaderCell>
					<Table.HeaderCell>Delivery Date</Table.HeaderCell>
					<Table.HeaderCell>Status</Table.HeaderCell>
					<Table.HeaderCell>Links</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				<Table.Row>
					<Table.Cell>
						<Label image>
							<img src="https://via.placeholder.com/32" alt="AP" />
							Ayyam Perumal
						</Label>
						<div>Senior Mobile Architect</div>
					</Table.Cell>
					<Table.Cell>Ride Sharing Platform</Table.Cell>
					<Table.Cell>React Native · FastAPI</Table.Cell>
					<Table.Cell>15 Aug 2026</Table.Cell>
					<Table.Cell>
						<Label color="green">In Progress</Label>
					</Table.Cell>
					<Table.Cell>
						<Button size="tiny" as="a" href="https://www.ayyamperumal.online/" target="_blank" primary>
							Portfolio
						</Button>
						<Button size="tiny" as="a" href="https://games.ayyamperumal.online/" target="_blank" secondary>
							Games
						</Button>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
}

export default TableComponent;