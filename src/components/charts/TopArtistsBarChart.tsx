import { Paper, Typography } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import type { ArtistSummary } from "../../types/dashboard";

type TopArtistsBarChartProps = {
    artists: ArtistSummary[];
    limit: number;
};

function TopArtistsBarChart({
    artists,
    limit
}: TopArtistsBarChartProps) {

    const topArtistas = artists.slice(0, limit);
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6">
                Top artistas
            </Typography>

            <Typography variant="body2" color="text.secondary">
                Mostrando hasta {limit} artistas de {artists.length} disponibles.
            </Typography>
            
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={topArtistas}
                    layout="vertical"
                    margin={{ top: 10, right: 20, left: 30, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis type="number" />

                    <YAxis
                        type="category"
                        dataKey="name"
                        width={100}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="followers"
                        fill="#1DB954"
                        name="Seguidores"
                    />
                </BarChart>
            </ResponsiveContainer>

        </Paper>
    );
}

export default TopArtistsBarChart;
