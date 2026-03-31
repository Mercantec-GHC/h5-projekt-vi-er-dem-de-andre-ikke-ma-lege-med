import { useState } from "react";
import { Button, Container, Header, Icon, Input, Modal } from "semantic-ui-react";
import Cards from "../../atoms/cards/cards";
import logo from "../../assets/logo.png";
import statusIcon from "../../atoms/status/statusIcon";
import accents from "../../atoms/status/stautsAccent";
import { API_URL } from "../../util/api.jsx";
import { getAuthHeaders, getAuthPayload } from "../../util/auth";

const MOCK_PING_DATA = {
    statusCode: 200,
    dnsLookup: "12ms",
    connect: "34ms",
    tlsHandshake: "21ms",
    ttfb: "89ms",
    totalTime: "156ms",
};

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function SearchWebsite() {
    const [searchValue, setSearchValue] = useState("");
    const [pingData, setPingData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        const trimmedValue = searchValue.trim();

        if (!trimmedValue) return;

        setIsLoading(true);

        const authPayload = getAuthPayload();
        const userId = authPayload?.userId;

        const payload = {
				"url":trimmedValue,
                "userId": userId,
                "intervalTime": 60,
		};
        

		const response = await fetch(`${API_URL}/Websites`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
                ...getAuthHeaders(),
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			throw new Error(
				`Request failed with status ${response.status}`,
			);  
		}

        await delay(1000);

        setPingData({
            url: trimmedValue,
            ...MOCK_PING_DATA,
        });

        setIsLoading(false);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        window.location.reload();
    };

    const pingCards = pingData
        ? [
            { header: String(pingData.statusCode), description: "Status Code", icon: statusIcon(pingData.statusCode), accent: accents.statusAccent(pingData.statusCode) },
            { header: pingData.dnsLookupMs, description: "DNS Lookup", icon: "search", accent: accents.dnsAccent(pingData.dnsLookupMs) },
            { header: pingData.connectMs, description: "Connect", icon: "plug", accent: accents.connectAccent(pingData.connectMs) },
            { header: pingData.tlsHandshakeMs, description: "TLS Handshake", icon: "lock", accent: accents.tlsAccent(pingData.tlsHandshakeMs) },
            { header: pingData.timeToFirstByteMs, description: "Time to First Byte", icon: "clock", accent: accents.tfbAccent(pingData.timeToFirstByteMs) },
            { header: pingData.totalTimeMs, description: "Total Time", icon: "hourglass half", accent: accents.ttAccent(pingData.totalTimeMs) },
        ]
        : [];

    return (
        <>
        <Container style={{ backgroundColor: "#091413", padding: "1rem", borderRadius: "8px", marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <Header as="h2" style={{ color: "#B0E4CC", margin: 0, fontSize: "2rem" }}>Search Website</Header>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <Input
                        iconPosition="left"
                        className="main-search-input"
                        icon="search"
                        placeholder="Search..."
                        value={searchValue}
                        disabled={isLoading}
                        onChange={(event) => setSearchValue(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && !isLoading) {
                                handleSearch();
                            }
                        }}
                    />
                    <Button onClick={handleSearch} disabled={isLoading}>Search</Button>
                </div>
            </div>
            <p style={{ color: "#408A71" }}>Input your website here to add it to your list on montired webistes</p>
        </Container>
        {isLoading && (
            <div className="global-spinner-overlay">
                <img
                    src={logo}
                    alt="Loading"
                    className="global-spinner-logo"
                />
                <span className="global-spinner-text">Fetching ping data...</span>
            </div>
        )}
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} size="large">
            <Modal.Header style={{ backgroundColor: "#091413", color: "#408A71", borderBottom: "1px solid #2f6d59" }}>
                {pingData?.url}               
            </Modal.Header>
            <Modal.Content style={{ backgroundColor: "#091413" }}>
                <Cards items={pingCards} />
            </Modal.Content>
            <Modal.Actions style={{ backgroundColor: "#091413", borderTop: "1px solid #2f6d59" }}>
                <Button onClick={() => setIsModalOpen(false)}>Edit</Button>
                <Button onClick={() => handleConfirm()} primary>
                    <Icon name="check" />
                    Confirm
                </Button>
            </Modal.Actions>
        </Modal>
        </>
    );
}

export default SearchWebsite;