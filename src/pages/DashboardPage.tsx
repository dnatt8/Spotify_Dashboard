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

const anioMin= 1952;
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

    const cancionesPorAnio = tracks.reduce<
        Record<
            number,
            {
                cantidad: number;
                popularidadTotal: number;
                duracionTotal: number;
            }
        >
    >((acumulador, track) => {
        const anio = Number(track.album_release_date.slice(0, 4));

        if (!acumulador[anio]) {
            acumulador[anio] = {
                cantidad: 0,
                popularidadTotal: 0,
                duracionTotal: 0
            };
        }

        acumulador[anio].cantidad += 1;
        acumulador[anio].popularidadTotal += track.track_popularity;
        acumulador[anio].duracionTotal += track.track_duration_min;

        return acumulador;
    }, {});

    const yearMetrics: YearMetrics[] = Object.entries(cancionesPorAnio).map(
        ([anio, datos]) => ({
            year: Number(anio),
            popularityAvg: datos.popularidadTotal / datos.cantidad,
            durationAvgMin: datos.duracionTotal / datos.cantidad
        })
    );

    const popularidadPromedio =
        tracks.length > 0
            ? tracks.reduce(
                  (total, track) => total + track.track_popularity,
                  0
              ) / tracks.length
            : 0;

    const seguidoresPromedio =
        tracks.length > 0
            ? tracks.reduce(
                  (total, track) => total + track.artist_followers,
                  0
              ) / tracks.length
            : 0;

    const duracionPromedio =
        tracks.length > 0
            ? tracks.reduce(
                  (total, track) => total + track.track_duration_min,
                  0
              ) / tracks.length
        : 0;

    const kpis = [
        {
            id: "popularity",
            label: "Popularidad promedio",
            value: popularidadPromedio.toFixed()
        },
        {
            id:"followers",
            label:"Seguidores promedio",
            value:seguidoresPromedio.toLocaleString()
        },
        {
            id:"duration",
            label:"Duración promedio",
            value:duracionPromedio.toFixed(1),
            unit: "min"
        }
    ];
            
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

                        <KpiGrid items={kpis} />

                        <ChartsGrid
                            data={yearMetrics}
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

