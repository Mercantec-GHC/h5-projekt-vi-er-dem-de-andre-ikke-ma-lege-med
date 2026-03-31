import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Segment } from "semantic-ui-react";
import accents from "../../atoms/status/stautsAccent";

const BarChartMonitor = (monitor) => {
    const { measurements } = monitor.data || {};   
    const latest = measurements?.at(-1);
    
    const colorMap = {
        green: "#408A71",
        yellow: "#FFD700",
        red: "#DC143C"
    };
    
    const getAccentFunc = (name) => {
        switch (name) {
            case 'DNS Lookup': return accents.dnsAccent;
            case 'Connect': return accents.connectAccent;
            case 'TLS Handshake': return accents.tlsAccent;
            case 'Time to First Byte': return accents.tfbAccent;
            case 'Total Time': return accents.ttAccent;
            default: return () => "green";
        }
    };
    
    const data = [
        { name: 'DNS Lookup', uv: latest?.dnsLookupMs ?? 0, color: colorMap[getAccentFunc('DNS Lookup')(latest?.dnsLookupMs ?? 0)] },
        { name: 'Connect', uv: latest?.connectMs ?? 0, color: colorMap[getAccentFunc('Connect')(latest?.connectMs ?? 0)] },
        { name: 'TLS Handshake', uv: latest?.tlsHandshakeMs ?? 0, color: colorMap[getAccentFunc('TLS Handshake')(latest?.tlsHandshakeMs ?? 0)] },
        { name: 'Time to First Byte', uv: latest?.timeToFirstByteMs ?? 0, color: colorMap[getAccentFunc('Time to First Byte')(latest?.timeToFirstByteMs ?? 0)] },
        { name: 'Total Time', uv: latest?.totalTimeMs ?? 0, color: colorMap[getAccentFunc('Total Time')(latest?.totalTimeMs ?? 0)] },
    ];

    const renderCustomBarLabel = ({ x, y, width, value }) => {
        return <text x={x + width / 2} y={y} fill="#B0E4CC" textAnchor="middle" dy={-6}>{`${value}ms`}</text>;
    };

    return (
        <Segment inverted style={{ marginTop: "2em", backgroundColor: "#091413", border: "1px solid #2f6d59" }}>
            <h3 style={{ color: "#B0E4CC", marginBottom: "0.5em" }}>Performance Metrics</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} />
                    <Bar dataKey="uv" label={renderCustomBarLabel}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Segment>
    );
};

export default BarChartMonitor;