import { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";

import KpiGrid from "../components/kpi/KpiGrid";
import { mockKpis } from "../data/mockData";
import type { AlbumType } from "../types/dashboard";
import AlbumTypeFilter from "../components/filters/AlbumTypeFilter";
import FilterBar from "../components/filters/FilterBar";
import type YearRange from "../types/dashboard";
import YearRangeFilter from "../components/filters/YearRangeFilter";

function DashboardPage() {
    const [albumType, setAlbumType] = useState<AlbumType>("all");
    const [yearRange, setYearRange] = useState<YearRange>({
    	    from: 2009,
    	    to: 2025
	});
    return (
        <Container maxWidth="xl">
            <Stack spacing={3}>
                <Typography variant="h4" component="h1">
                    Spotify Dashboard
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    Análisis y estadísticas de música.
                </Typography>
		
		<FilterBar>
		    <YearRangeFilter
        		value={yearRange}
        		minYear={2009}
        		maxYear={2025}
        		onChange={setYearRange}
    		    />
    		    <AlbumTypeFilter
        	        value={albumType}
        		options={["all", "album", "single", "compilation"]}
        		onChange={setAlbumType}
    		    />
		</FilterBar>

                <KpiGrid items={mockKpis} />
            </Stack>
        </Container>
    );
}

export default DashboardPage;

