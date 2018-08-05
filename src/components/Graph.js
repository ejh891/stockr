import React from 'react';
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Line,
    Tooltip,
} from 'recharts';

export default function Graph(props) {
    const {
        data,
    } = props;

    const formattedData = data.map(datum => ({ name: datum.date, close: datum.close, open: datum.open, high: datum.high, low: datum.low }));

    return (
        <LineChart width={730} height={250} data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="open" stroke="#8884d8" />
            <Line type="monotone" dataKey="close" stroke="#82ca9d" />
            <Line type="monotone" dataKey="high" stroke="#00ff00" />
            <Line type="monotone" dataKey="low" stroke="#ff0000" />
        </LineChart>
    );
}
