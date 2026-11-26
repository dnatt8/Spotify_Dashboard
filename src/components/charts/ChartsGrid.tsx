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
            <Grid size={{ xs: 12, md: 8 }} sx={{ display: { xs: "none", md: "block" } }}>
                <TrendChart data={data} />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <ReleaseTypeDonutChart data={releaseData} />
            </Grid>

            <Grid size={{ xs: 12, md: 12 }}>
                <TopArtistsBarChart
                    artists={artists}
                    limit={5}
                />
            </Grid>
        </Grid>
    );
}

export default ChartsGrid;
