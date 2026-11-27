import { Grid } from "@mui/material";

import type {
    YearMetrics,
    ReleaseShare,
    ArtistSummary
} from "../../types/dashboard";

import TrendChart from "./TrendChart";
import ReleaseTypeDonutChart from "./ReleaseTypeDonutChart";
import TopArtistsBarChart from "./TopArtistsBarChart";

type ChartsGridProps = {
    data: YearMetrics[];
    releaseData: ReleaseShare[];
    artists: ArtistSummary[];
};

function ChartsGrid({
    data,
    releaseData,
    artists
}: ChartsGridProps) {
    return (
        <Grid container spacing={2}>

            {/* Gráfico de evolución: solo visible en escritorio, en móvil no se visualiza bien */}
            <Grid
                size={{ xs: 12, md: 8 }}
                sx={{ minWidth: 0, display: {xs:"none", md:"block"} }}
            >
                <TrendChart data={data} />
            </Grid>

            {/* Gráfico de tipos de lanzamiento */}
            <Grid
                size={{ xs: 12, md: 4 }}
                sx={{ minWidth: 0 }}
            >
                <ReleaseTypeDonutChart data={releaseData} />
            </Grid>

            {/* Gráfico de artistas y destino del sidebar */}
            <Grid
                id="artists"
                size={{ xs: 12 }}
                sx={{
                    minWidth: 0,
                    scrollMarginTop: "16px"
                }}
            >
                <TopArtistsBarChart
                    artists={artists}
                    limit={5}
                />
            </Grid>

        </Grid>
    );
}

export default ChartsGrid;
