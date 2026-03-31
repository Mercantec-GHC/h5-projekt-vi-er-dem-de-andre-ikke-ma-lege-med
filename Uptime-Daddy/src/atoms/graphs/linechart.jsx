import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Segment } from 'semantic-ui-react';
import accents from "../../atoms/status/stautsAccent";

const LineChartMonitor = (monitor) => {
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
        { name: 'DNS Lookup', uv: latest?.dnsLookupMs ?? 0 },
        { name: 'Connect', uv: latest?.connectMs ?? 0 },
        { name: 'TLS Handshake', uv: latest?.tlsHandshakeMs ?? 0 },
        { name: 'Time to First Byte', uv: latest?.timeToFirstByteMs ?? 0 },
        { name: 'Total Time', uv: latest?.totalTimeMs ?? 0 },
    ];

    const customDot = (props) => {
        const { payload } = props;
        const accentFunc = getAccentFunc(payload.name);
        const accent = accentFunc(payload.uv);
        const fillColor = colorMap[accent];
        return <circle {...props} fill={fillColor} />;
    };

    return (
        <Segment inverted style={{ marginTop: "2em", backgroundColor: "#091413", border: "1px solid #2f6d59" }}>
            <h3 style={{ color: "#B0E4CC", marginBottom: "0.5em" }}>Performance Metrics</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid stroke="#2f6d59" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#B0E4CC" />
                    <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} stroke="#B0E4CC" />
                    <Tooltip
                        cursor={{
                            stroke: '#2f6d59',
                        }}
                        contentStyle={{
                            backgroundColor: '#091413',
                            borderColor: '#2f6d59',
                            color: '#B0E4CC',
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="uv"
                        stroke="#2f6d59"
                        dot={customDot}
                        activeDot={(props) => customDot(props)}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Segment>
    );
};

export default LineChartMonitor;