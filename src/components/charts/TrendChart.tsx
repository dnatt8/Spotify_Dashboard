import { Paper, Typography } from "@mui/material";
import type { YearMetrics } from "../../types/dashboard";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

type TrendChartProps = {
    data: YearMetrics[];
};

function TrendChart({ data }: TrendChartProps) {
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6">
                Evolución de popularidad y duración
            </Typography>

            <Typography variant="body2" color="text.secondary">
                {data.length} años disponibles para mostrar.
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 100]} yAxisId="popularidad"/>
                    <YAxis yAxisId="duracion" orientation="right" />
                    <Tooltip />

                    <Line
                        yAxisId="popularidad"
                        type="monotone"
                        dataKey="popularityAvg"
                        stroke="#1DB954"
                        name="Popularidad promedio"
                        dot={{ r: 2 }}
                        activeDot={{ r: 5 }}
                    />

                    <Line
                        yAxisId="duracion"
                        type="monotone"
                        dataKey="durationAvgMin"
                        stroke="#3B82F6"
                        name="Duración promedio (min)"
                        dot={{ r: 2 }}
                        activeDot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>

        </Paper>
    );
}

export default TrendChart;
