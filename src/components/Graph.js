import React from 'react';
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Line,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export default function Graph(props) {
    const {
        data,
    } = props;

    const formattedData = data.map(datum => ({
        label: datum.label.split(',')[0], // removes the year
        close: datum.close,
        open: datum.open,
        high: datum.high,
        low: datum.low
    }));

    return (
        <div
            style={{
                marginTop: 40,
                height: '40vh',
                maxHeight: 400,
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="label"
                    />
                    <YAxis domain={['dataMin', 'dataMax']} />
                    <Tooltip
                    />
                    <Legend
                    />
                    <Line type="monotone" dataKey="open" stroke="#8884d8" />
                    <Line type="monotone" dataKey="close" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="high" stroke="#00ff00" />
                    <Line type="monotone" dataKey="low" stroke="#ff0000" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
