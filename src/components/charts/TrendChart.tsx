import { Paper, Typography } from "@mui/material";
import type { YearMetrics } from "../../types/dashboard";

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
        </Paper>
    );
}

export default TrendChart;
