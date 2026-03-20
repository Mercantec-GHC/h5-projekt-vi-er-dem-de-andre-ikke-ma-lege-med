import "./style.css";
import { Statistic, Segment } from "semantic-ui-react";

function Cards() {
	return (
		<Segment>
			<Statistic.Group widths="three">
				<Statistic>
					<Statistic.Value>0</Statistic.Value>
					<Statistic.Label>Monitored Websites</Statistic.Label>
				</Statistic>
				<Statistic>
					<Statistic.Value>37</Statistic.Value>
					<Statistic.Label>Down Websites</Statistic.Label>
				</Statistic>
				<Statistic>
					<Statistic.Value>8</Statistic.Value>
					<Statistic.Label>Pending Deliverables</Statistic.Label>
				</Statistic>
			</Statistic.Group>
		</Segment>
	);
}

export default Cards;
