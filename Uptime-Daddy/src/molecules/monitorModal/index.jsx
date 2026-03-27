import { Modal, Button } from "semantic-ui-react";
import Cards from "../../atoms/cards/cards";
import statusIcon from "../../atoms/status/statusIcon";
import statusAccent from "../../atoms/status/stautsAccent";

function MonitorModal({ monitor, onClose }) {
  if (!monitor) return null;

  const latest = monitor.measurements?.at(-1);

  const items = [
    {
      header: latest ? String(latest.statusCode) : "-",
      description: "Status Code",
      icon: statusIcon(latest?.statusCode),
      accent: statusAccent(latest?.statusCode),
    },
    { header: latest?.dnsLookupMs != null ? `${latest.dnsLookupMs}ms` : "-",        description: "DNS Lookup",        icon: "search",         accent: "blue"  },
    { header: latest?.connectMs != null ? `${latest.connectMs}ms` : "-",            description: "Connect",           icon: "plug",           accent: "blue"  },
    { header: latest?.tlsHandshakeMs != null ? `${latest.tlsHandshakeMs}ms` : "-",  description: "TLS Handshake",     icon: "lock",           accent: "blue"  },
    { header: latest?.timeToFirstByteMs != null ? `${latest.timeToFirstByteMs}ms` : "-", description: "Time to First Byte", icon: "clock",   accent: "green" },
    { header: latest?.totalTimeMs != null ? `${latest.totalTimeMs}ms` : "-",        description: "Total Time",        icon: "hourglass half", accent: "green" },
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