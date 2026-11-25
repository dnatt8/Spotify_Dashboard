import { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";

import KpiGrid from "../components/kpi/KpiGrid";
import { mockKpis, mockTracks } from "../data/mockData";
import type { AlbumType, YearRange } from "../types/dashboard";
import AlbumTypeFilter from "../components/filters/AlbumTypeFilter";
import FilterBar from "../components/filters/FilterBar";
import YearRangeFilter from "../components/filters/YearRangeFilter";
import TrackTable from "../components/table/TrackTable";

import DashboardHeader from "../components/header/DashboardHeader";

import Sidebar from "../components/layout/SideBar";
import MainPanel from "../components/layout/MainPanel";
import DashboardLayout from "../components/layout/DashboardLayout";

import ChartsGrid from "../components/charts/ChartsGrid";

import {
  mockYearMetrics,
  mockArtists,
  mockReleaseShares
} from "../data/mockData";


import { mockTrackColumns } from "../data/mockData";

import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import useSpotifyData from "../hooks/useSpotifyData";

const anioMin= 1998;
const anioMax= 2025

function DashboardPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [albumType, setAlbumType] = useState<AlbumType>("all");
    const [yearRange, setYearRange] = useState<YearRange>({
    	    from: anioMin,
    	    to: anioMax 
	});
    
    const [page, setPage] = useState(1);
    const pageSize = 3;

    const { tracks, loading, error } = useSpotifyData();
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const dashboardTracks = tracks.map((track) => ({
        id: track.id,
        track: track.track_name,
        artist: track.artist_name ?? "Desconocido",
        album: track.album_name,
        year: Number(track.album_release_date.slice(0, 4)),
        popularity: track.track_popularity,
        explicit: track.explicit,
        durationMin: track.track_duration_min,
        albumType: track.album_type
    }));
    
    const filteredTracks = dashboardTracks.filter((track) => {
        const matchesYear =
            track.year >= yearRange.from &&
            track.year <= yearRange.to;

        const matchesAlbumType =
            track.albumType === albumType || albumType === "all";

        return matchesYear && matchesAlbumType;
    });
    
    const currentTracks = filteredTracks.slice(startIndex, endIndex);

    const [activeSection, setActiveSection] = useState("overview");

    
    return (
        <DashboardLayout
            sidebar={
                <Sidebar
                    activeSection={activeSection}
                    onNavigate={setActiveSection}
                    mobileOpen={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                />
            }
        >
            <MainPanel>
               <Container maxWidth="xl">
                    <Stack spacing={3}>

                        <IconButton
                            aria-label="Abrir menú"
                            onClick={() => setMobileOpen(true)}
                            sx={{
                            display: { xs: "inline-flex", md: "none" },
                            alignSelf: "flex-start",
                            color: "#ffffff"
                                }}
                            >
                            <MenuIcon />
                        </IconButton>

                        <DashboardHeader
                            title="Spotify Dashboard"
                            subtitle="Análisis y estadísticas de música."
                            onExport= {() => {}}
                        />

                        <FilterBar>
                            <YearRangeFilter
                                value={yearRange}
                                minYear={anioMin}
                                maxYear={anioMax}
                                onChange={(range) => {
                                    setYearRange(range);
                                    setPage(1);
                                }}
                            />

                            <AlbumTypeFilter
                                value={albumType}
                                options={["all", "album", "single", "compilation"]}
                                onChange={(type) => {
                                    setAlbumType(type);
                                    setPage(1);
                                }}
                            />
                        </FilterBar>

                        <KpiGrid items={mockKpis} />

                        <ChartsGrid
                            data={mockYearMetrics}
                            releaseData={mockReleaseShares}
                            artists={mockArtists}
                        />
                        
                        {loading ? (
                            <Typography>Cargando canciones...</Typography>
                        ) : error ? (
                            <Typography color="error">{error}</Typography>
                        ) : (
                            <TrackTable
                                rows={currentTracks}
                                columns={mockTrackColumns}
                                page={page}
                                pageSize={pageSize}
                                totalItems={filteredTracks.length}
                                onPageChange={setPage}
                            />
                        )}
                    </Stack>
                </Container>
            </MainPanel>
        </DashboardLayout>
    );
}

export default DashboardPage;

