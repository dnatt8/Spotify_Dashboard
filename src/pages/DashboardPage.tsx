import { Container, Stack, Typography } from "@mui/material";

import KpiGrid from "../components/kpi/KpiGrid";
import { mockKpis } from "../data/mockData";

function DashboardPage() {
    return (
        <Container maxWidth="xl">
            <Stack spacing={3}>
                <Typography variant="h4" component="h1">
                    Spotify Dashboard
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    Análisis y estadísticas de música.
                </Typography>

                <KpiGrid items={mockKpis} />
            </Stack>
        </Container>
    );
}

export default DashboardPage;

