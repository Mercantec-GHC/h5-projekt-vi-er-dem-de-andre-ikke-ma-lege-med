import { useState, useEffect } from "react";
import "./style.css";
import { Table, Label } from "semantic-ui-react";
import MonitorModal from "../monitorModal/index.jsx";
import { API_URL } from "../../util/api.jsx";
import { getAuthPayload } from "../../util/auth";

function statusColor(code) {
	if (code >= 200 && code < 300) return "green";
	if (code >= 300 && code < 400) return "yellow";
	return "red";
}

function TableComponent() {
	const [selected, setSelected] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [loading, setLoading] = useState(false);
  	const [websiteData, setWebsiteData] = useState([]);
	const authPayload = getAuthPayload();
	const userId = authPayload?.userId; 

	const fetchWebsiteData = async () => {
		setLoading(true);
		setErrorMessage("");
		setSuccessMessage("");

		try {
			const response = await fetch(`${API_URL}/api/Websites/user/${userId}/with-measurements`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();
			setWebsiteData(Array.isArray(data) ? data : []);

			if (!response.ok) {
				throw new Error(
					`Request failed with status ${response.status}`,
				);
			}

			setSuccessMessage("Account data sent successfully.");
		} catch (error) {
			if (error instanceof TypeError) {
				setErrorMessage(
					"Network error. Check that the API is running on port 6969.",
				);
			} else {
				setErrorMessage(
					error.message || "Failed to send account data.",
				);
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchWebsiteData();
	}, []);

	return (
		<>
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
						<Label color={statusColor(latest?.statusCode)}>
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