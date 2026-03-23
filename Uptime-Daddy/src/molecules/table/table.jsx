import { useState } from "react";
import "./style.css";
import { Table, Label } from "semantic-ui-react";
import MonitorModal from "../monitorModal/index.jsx";

const monitors = [
  { url: "https://example.com",        statusCode: 200, dnsLookup: "12ms", connect: "34ms", tlsHandshake: "21ms", ttfb: "89ms",  totalTime: "156ms" },
  { url: "https://api.myservice.io",   statusCode: 200, dnsLookup: "8ms",  connect: "22ms", tlsHandshake: "18ms", ttfb: "105ms", totalTime: "153ms" },
  { url: "https://dashboard.acme.com", statusCode: 503, dnsLookup: "15ms", connect: "41ms", tlsHandshake: "30ms", ttfb: "213ms",     totalTime: "86ms"  },
  { url: "https://store.widgets.dev",  statusCode: 301, dnsLookup: "10ms", connect: "28ms", tlsHandshake: "24ms", ttfb: "62ms",  totalTime: "124ms" },
  { url: "https://blog.techcorp.io",   statusCode: 200, dnsLookup: "9ms",  connect: "19ms", tlsHandshake: "17ms", ttfb: "74ms",  totalTime: "119ms" },
];

function statusColor(code) {
  if (code >= 200 && code < 300) return "green";
  if (code >= 300 && code < 400) return "yellow";
  return "red";
}

function TableComponent() {
  const [selected, setSelected] = useState(null);

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
          {monitors.map((m) => (
            <Table.Row key={m.url} onClick={() => setSelected(m)} style={{ cursor: "pointer" }}>
              <Table.Cell>{m.url}</Table.Cell>
              <Table.Cell>
                <Label color={statusColor(m.statusCode)}>{m.statusCode}</Label>
              </Table.Cell>
              <Table.Cell>{m.dnsLookup}</Table.Cell>
              <Table.Cell>{m.connect}</Table.Cell>
              <Table.Cell>{m.tlsHandshake}</Table.Cell>
              <Table.Cell>{m.ttfb}</Table.Cell>
              <Table.Cell>{m.totalTime}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <MonitorModal monitor={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export default TableComponent;