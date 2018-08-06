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

import { colors } from '../settings/theme';

export default function Graph(props) {
    const {
        data,
    } = props;

    const maxPrice = data.reduce((maxPrice, datum) => Math.max(maxPrice, datum.close), 0);
    const yAxisCap = parseInt((maxPrice * 1.05).toFixed(0), 10);

    const formattedData = data.map(datum => ({
        label: datum.label,
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
                    <YAxis domain={[0, yAxisCap]} />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone" dataKey="close" stroke={colors.primary}
                        dot={{
                            onClick: () => console.log(arguments),
                        }}
                        activeDot={{
                            onClick: () => console.log(arguments),
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
