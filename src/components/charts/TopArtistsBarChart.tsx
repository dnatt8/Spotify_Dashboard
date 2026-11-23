import { Paper, Typography } from "@mui/material";
import type { ArtistSummary } from "../../types/dashboard";

type TopArtistsBarChartProps = {
    artists: ArtistSummary[];
    limit: number;
};

function TopArtistsBarChart({
    artists,
    limit
}: TopArtistsBarChartProps) {
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6">
                Top artistas
            </Typography>

            <Typography variant="body2" color="text.secondary">
                Mostrando hasta {limit} artistas de {artists.length} disponibles.
            </Typography>
        </Paper>
    );
}

export default TopArtistsBarChart;
