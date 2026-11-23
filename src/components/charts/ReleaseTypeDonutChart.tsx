import { Paper, Typography } from "@mui/material";
import type { ReleaseShare } from "../../types/dashboard";

type ReleaseTypeDonutChartProps = {
    data: ReleaseShare[];
};

function ReleaseTypeDonutChart({
    data
}: ReleaseTypeDonutChartProps) {
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6">
                Tipos de lanzamiento
            </Typography>

            <Typography variant="body2" color="text.secondary">
                {data.length} categorías disponibles para mostrar.
            </Typography>
        </Paper>
    );
}

export default ReleaseTypeDonutChart;
