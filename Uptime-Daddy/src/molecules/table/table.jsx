import { useState, useEffect } from "react";
import "./style.css";
import { Table, Label } from "semantic-ui-react";
import MonitorModal from "../monitorModal/index.jsx";
import { API_URL } from "../../util/api.jsx";
import { getAuthPayload, getAuthHeaders} from "../../util/auth";
import accents from "../../atoms/status/stautsAccent";
import logo from "../../assets/logo.png";

function TableComponent() {
	const [selected, setSelected] = useState(null);
	const [loading, setLoading] = useState(false);
  	const [websiteData, setWebsiteData] = useState([]);
	const authPayload = getAuthPayload();
	const userId = authPayload?.userId; 

	const fetchWebsiteData = async () => {
		setLoading(true);

		try {
			const response = await fetch(`${API_URL}/Websites/user/${userId}/with-measurements`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					...getAuthHeaders(),
				},
			});

			const data = await response.json();
			setWebsiteData(Array.isArray(data) ? data : []);

			if (!response.ok) {
				throw new Error(
					`Request failed with status ${response.status}`,
				);
			}

		} catch (error) {
			console.error("Error fetching account data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchWebsiteData();
	}, []);

	return (
		<>
			{loading && (
				<div className="global-spinner-overlay">
					<img
						src={logo}
						alt="Loading"
						className="global-spinner-logo"
					/>
					<span className="global-spinner-text">Loading websites...</span>
				</div>
			)}
			<Table celled selectable className="monitor-table">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>URL</Table.HeaderCell>
						<Table.HeaderCell>Status Code</Table.HeaderCell>
						<Table.HeaderCell>DNS Lookup</Table.HeaderCell>
						<Table.HeaderCell>Connect</Table.HeaderCell>
						<Table.HeaderCell>TLS Handshake</Table.HeaderCell>
						<Table.HeaderCell>Time to First Byte</Table.HeaderCell>
						<Table.HeaderCell>Total Time</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
				{websiteData.map((m) => {
					const latest = m.measurements?.at(-1);
					return (
					<Table.Row
						key={m.id}
						onClick={() => setSelected(m)}
						style={{ cursor: "pointer" }}
					>
						<Table.Cell>{m.url}</Table.Cell>
						<Table.Cell>
						<Label color={accents.statusAccent(latest?.statusCode)}>
							{latest?.statusCode ?? "-"}
						</Label>
						</Table.Cell>
						<Table.Cell>{latest?.dnsLookupMs != null ? `${latest.dnsLookupMs}ms` : "-"}</Table.Cell>
						<Table.Cell>{latest?.connectMs != null ? `${latest.connectMs}ms` : "-"}</Table.Cell>
						<Table.Cell>{latest?.tlsHandshakeMs != null ? `${latest.tlsHandshakeMs}ms` : "-"}</Table.Cell>
						<Table.Cell>{latest?.timeToFirstByteMs != null ? `${latest.timeToFirstByteMs}ms` : "-"}</Table.Cell>
						<Table.Cell>{latest?.totalTimeMs != null ? `${latest.totalTimeMs}ms` : "-"}</Table.Cell>
					</Table.Row>
					);
				})}
				</Table.Body>
			</Table>

			<MonitorModal
				monitor={selected}
				onClose={() => setSelected(null)}
			/>
		</>
	);
}

export default TableComponent;