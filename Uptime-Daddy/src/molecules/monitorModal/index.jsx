import { Modal, Button } from "semantic-ui-react";
import Cards from "../../atoms/cards/cards";
import statusIcon from "../../atoms/status/statusIcon";
import statusAccent from "../../atoms/status/stautsAccent";

function MonitorModal({ monitor, onClose }) {
  if (!monitor) return null;

  const items = [
    {
      header: String(monitor.statusCode),
      description: "Status Code",
      icon: statusIcon(monitor.statusCode),
      accent: statusAccent(monitor.statusCode),
    },
    { header: monitor.dnsLookup,    description: "DNS Lookup",          icon: "search",    accent: "blue"  },
    { header: monitor.connect,      description: "Connect",             icon: "plug",      accent: "blue"  },
    { header: monitor.tlsHandshake, description: "TLS Handshake",       icon: "lock",      accent: "blue"  },
    { header: monitor.ttfb,         description: "Time to First Byte",  icon: "clock",     accent: "green" },
    { header: monitor.totalTime,    description: "Total Time",          icon: "hourglass half", accent: "green" },
  ];

  return (
    <Modal open={Boolean(monitor)} onClose={onClose} size="large">
      <Modal.Header style={{ backgroundColor: "#091413", color: "#408A71", borderBottom: "1px solid #2f6d59" }}>
        {monitor.url}
      </Modal.Header>

      <Modal.Content style={{ backgroundColor: "#091413" }}>
        <Cards items={items} />
      </Modal.Content>

      <Modal.Actions style={{ backgroundColor: "#091413", borderTop: "1px solid #2f6d59" }}>
        <Button onClick={onClose} style={{ backgroundColor: "#0f1f1c", color: "#8fb8a8", border: "1px solid #2f6d59" }}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default MonitorModal;