import { useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import Cards from "../../atoms/cards/cards";
import statusIcon from "../../atoms/status/statusIcon";
import accents from "../../atoms/status/stautsAccent";
import { API_URL } from "../../util/api.jsx";
import logo from "../../assets/logo.png";

function MonitorModal({ monitor, onClose }) {
  const [isLoading, setIsLoading] = useState(false);

  if (!monitor && !isLoading) return null;

  const latest = monitor?.measurements?.at(-1);

  const items = [
    { header: latest ? String(latest.statusCode) : "-",                                   description: "Status Code",         icon: statusIcon(latest?.statusCode), accent: accents.statusAccent(latest?.statusCode) },
    { header: latest?.dnsLookupMs != null ? `${latest.dnsLookupMs}ms` : "-",              description: "DNS Lookup",          icon: "search",                       accent: accents.dnsAccent("dnsLookup", latest?.dnsLookupMs) },
    { header: latest?.connectMs != null ? `${latest.connectMs}ms` : "-",                  description: "Connect",             icon: "plug",                         accent: accents.connectAccent("connect", latest?.connectMs) },
    { header: latest?.tlsHandshakeMs != null ? `${latest.tlsHandshakeMs}ms` : "-",        description: "TLS Handshake",       icon: "lock",                         accent: accents.tlsAccent("tlsHandshake", latest?.tlsHandshakeMs) },
    { header: latest?.timeToFirstByteMs != null ? `${latest.timeToFirstByteMs}ms` : "-",  description: "Time to First Byte",  icon: "clock",                        accent: accents.tfbAccent("timeToFirstByte", latest?.timeToFirstByteMs) },
    { header: latest?.totalTimeMs != null ? `${latest.totalTimeMs}ms` : "-",              description: "Total Time",          icon: "hourglass half",               accent: accents.ttAccent("totalTime", latest?.totalTimeMs) },
  ];


  const handleDelete = async (website) => {
    onClose();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/Websites/${website.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };


  return (
    <>
      {isLoading && (
          <div className="global-spinner-overlay">
              <img
                  src={logo}
                  alt="Loading"
                  className="global-spinner-logo"
              />
              <span className="global-spinner-text">Deleting website...</span>
          </div>
      )}
    {monitor && (
    <Modal open={Boolean(monitor)} onClose={onClose} size="large">
      <Modal.Header style={{ backgroundColor: "#091413", color: "#408A71", borderBottom: "1px solid #2f6d59" }}>
        {monitor.url}
      </Modal.Header>

      <Modal.Content style={{ backgroundColor: "#091413" }}>
        <Cards items={items} />
      </Modal.Content>

      <Modal.Actions style={{ backgroundColor: "#091413", borderTop: "1px solid #2f6d59" }}>
        <Button onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => handleDelete(monitor)} negative disabled={isLoading}>
          Slet Website
        </Button>
      </Modal.Actions>
    </Modal>
    )}
    </>
  );
}

export default MonitorModal;