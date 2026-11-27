import { Paper, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";
import type { ReleaseShare } from "../../types/dashboard";

type ReleaseTypeDonutChartProps = {
    data: ReleaseShare[];
};

function ReleaseTypeDonutChart({
    data
}: ReleaseTypeDonutChartProps) {
    const COLORS = ["#1DB954", "#3B82F6", "#F59E0B"];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6">
                Tipos de lanzamiento
            </Typography>

            <Typography variant="body2" color="text.secondary">
                {data.length} categorías disponibles para mostrar.
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="type"
                        innerRadius={70}
                        outerRadius={100}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={entry.type}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    {!isMobile && <Tooltip />}

                    <Legend
                        layout="horizontal"
                        align="center"
                        verticalAlign="bottom"
                        iconSize={8}
                        wrapperStyle={{
                            paddingTop: 0
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
}

export default ReleaseTypeDonutChart;
