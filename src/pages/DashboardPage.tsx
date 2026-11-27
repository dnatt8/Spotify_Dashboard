import { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";

import KpiGrid from "../components/kpi/KpiGrid";

import type {
    AlbumType,
    YearRange,
    ArtistSummary,
    YearMetrics,
    ReleaseShare
} from "../types/dashboard";

import AlbumTypeFilter from "../components/filters/AlbumTypeFilter";
import FilterBar from "../components/filters/FilterBar";
import YearRangeFilter from "../components/filters/YearRangeFilter";
import TrackTable from "../components/table/TrackTable";

import DashboardHeader from "../components/header/DashboardHeader";

import Sidebar from "../components/layout/SideBar";
import MainPanel from "../components/layout/MainPanel";
import DashboardLayout from "../components/layout/DashboardLayout";

import ChartsGrid from "../components/charts/ChartsGrid";

import { mockTrackColumns } from "../data/mockData";

import useSpotifyData from "../hooks/useSpotifyData";

import { exportarCancionesCSV } from "../utils/exportCsv";

const anioMin = 1952;
const anioMax = 2025;

function DashboardPage() {
    // Estados de la interfaz
    const [mobileOpen, setMobileOpen] = useState(false);
    const [albumType, setAlbumType] = useState<AlbumType>("all");

    const [yearRange, setYearRange] = useState<YearRange>({
        from: anioMin,
        to: anioMax
    });

    const [page, setPage] = useState(1);
    const pageSize = 3;

    const [activeSection, setActiveSection] = useState("overview");

    // Datos obtenidos de Firebase
    const { tracks, loading, error } = useSpotifyData();

    // 1. FILTRADO COMPARTIDO
    // Los filtros se aplican una sola vez.
    const tracksFiltrados = tracks.filter((track) => {
        const anio = Number(
            track.album_release_date.slice(0, 4)
        );

        const coincideAnio =
            anio >= yearRange.from &&
            anio <= yearRange.to;

        const coincideAlbum =
            albumType === "all" ||
            track.album_type === albumType;

        return coincideAnio && coincideAlbum;
    });

    // 2. AGRUPACIÓN DE ARTISTAS
    // Evitamos contar varias veces al mismo artista.
    // Se conserva el máximo de seguidores registrado.
    const seguidoresPorArtista = tracksFiltrados.reduce<
        Record<string, number>
    >((acumulador, track) => {
        if (!track.artist_name) {
            return acumulador;
        }

        const seguidoresActuales =
            acumulador[track.artist_name] ?? 0;

        acumulador[track.artist_name] = Math.max(
            seguidoresActuales,
            track.artist_followers
        );

        return acumulador;
    }, {});

    const artistas: ArtistSummary[] = Object.entries(
        seguidoresPorArtista
    ).map(([nombre, seguidores]) => ({
        name: nombre,
        followers: seguidores
    }));

    // Top 5 de artistas ordenados por seguidores
    const artistasOrdenados = [...artistas]
        .sort((a, b) => b.followers - a.followers);

    // 3. DATOS PARA EL GRÁFICO DE EVOLUCIÓN
    // Los promedios anuales respetan los filtros.
    const cancionesPorAnio = tracksFiltrados.reduce<
        Record<
            number,
            {
                cantidad: number;
                popularidadTotal: number;
                duracionTotal: number;
            }
        >
    >((acumulador, track) => {
        const anio = Number(
            track.album_release_date.slice(0, 4)
        );

        if (!acumulador[anio]) {
            acumulador[anio] = {
                cantidad: 0,
                popularidadTotal: 0,
                duracionTotal: 0
            };
        }

        acumulador[anio].cantidad += 1;
        acumulador[anio].popularidadTotal +=
            track.track_popularity;
        acumulador[anio].duracionTotal +=
            track.track_duration_min;

        return acumulador;
    }, {});

    const yearMetrics: YearMetrics[] = Object.entries(
        cancionesPorAnio
    )
        .map(([anio, datos]) => ({
            year: Number(anio),
            popularityAvg:
                datos.popularidadTotal / datos.cantidad,
            durationAvgMin:
                datos.duracionTotal / datos.cantidad
        }))
        .sort((a, b) => a.year - b.year);

    // 4. KPI DINÁMICOS
    // Se calculan utilizando las canciones filtradas.
    const popularidadPromedio =
        tracksFiltrados.length > 0
            ? tracksFiltrados.reduce(
                (total, track) =>
                    total + track.track_popularity,
                0
            ) / tracksFiltrados.length
            : 0;

    const seguidoresPromedio =
        artistas.length > 0
            ? artistas.reduce(
                (total, artista) =>
                    total + artista.followers,
                0
            ) / artistas.length
            : 0;

    const duracionPromedio =
        tracksFiltrados.length > 0
            ? tracksFiltrados.reduce(
                (total, track) =>
                    total + track.track_duration_min,
                0
            ) / tracksFiltrados.length
            : 0;

    const kpis = [
        {
            id: "popularity",
            label: "Popularidad promedio",
            value: popularidadPromedio.toFixed(0)
        },
        {
            id: "followers",
            label: "Seguidores promedio",
            value: Math.round(
                seguidoresPromedio
            ).toLocaleString()
        },
        {
            id: "duration",
            label: "Duración promedio",
            value: duracionPromedio.toFixed(1),
            unit: "min"
        }
    ];

    // 5. PREPARACIÓN DE DATOS PARA LA TABLA
    const dashboardTracks = tracksFiltrados.map((track) => ({
        id: track.id,
        track: track.track_name,
        artist: track.artist_name ?? "Desconocido",
        album: track.album_name,
        year: Number(
            track.album_release_date.slice(0, 4)
        ),
        popularity: track.track_popularity,
        explicit: track.explicit,
        durationMin: track.track_duration_min,
        albumType: track.album_type
    }));

    // 6. DISTRIBUCIÓN DE TIPOS DE LANZAMIENTO
    const releaseCounts = dashboardTracks.reduce<
        Record<string, number>
    >((acumulador, track) => {
        if (!acumulador[track.albumType]) {
            acumulador[track.albumType] = 0;
        }

        acumulador[track.albumType] += 1;

        return acumulador;
    }, {});

    const totalReleases = dashboardTracks.length;

    const releaseShares: ReleaseShare[] = Object.entries(
        releaseCounts
    ).map(([type, count]) => ({
        type,
        count,
        percent:
            totalReleases > 0
                ? (count / totalReleases) * 100
                : 0
    }));

    // 7. PAGINACIÓN
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const currentTracks = dashboardTracks.slice(
        startIndex,
        endIndex
    );


    const handleExport = () => {

        // Evitar exportar mientras Firebase carga
        if (loading || error) {
            window.alert(
                "Los datos todavía no están disponibles para exportar."
            );
            return;
        }

        // Evitar descargar archivos vacíos
        if (dashboardTracks.length === 0) {
            window.alert(
                "No hay canciones con los filtros seleccionados."
            );
            return;
        }

        // Exportar todas las canciones filtradas
        exportarCancionesCSV(
            dashboardTracks,
            yearRange.from,
            yearRange.to,
            albumType
        );
    };


    // 8. INTERFAZ
    return (
        <DashboardLayout
            sidebar={               
                <Sidebar
                    activeSection={activeSection}
                    onNavigate={(id) => {
                        setActiveSection(id);
                        document.getElementById(id)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }}
                    mobileOpen={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                />
            }
        >
            <MainPanel>
                <Container maxWidth="xl">
                    <Stack id="overview" spacing={3}>

                        <DashboardHeader
                            title="Spotify Dashboard"
                            subtitle="Análisis y estadísticas de canciones."
                            onExport={handleExport}
                            onOpenMenu={() => setMobileOpen(true)}
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
                                options={[
                                    "all",
                                    "album",
                                    "single",
                                    "compilation"
                                ]}
                                onChange={(type) => {
                                    setAlbumType(type);
                                    setPage(1);
                                }}
                            />
                        </FilterBar>

                        {loading ? (
                            <Typography color="text.secondary">
                                Cargando canciones...
                            </Typography>
                        ) : error ? (
                            <Typography color="error">
                                {error}
                            </Typography>
                        ) : (
                            <>
                                <KpiGrid items={kpis} />

                                <ChartsGrid
                                    data={yearMetrics}
                                    releaseData={releaseShares}
                                    artists={artistasOrdenados}
                                />

                                
                                <div id="tracks" style={{ scrollMarginTop: 16 }}>
                                    <TrackTable
                                        rows={currentTracks}
                                        columns={mockTrackColumns}
                                        page={page}
                                        pageSize={pageSize}
                                        totalItems={dashboardTracks.length}
                                        onPageChange={setPage}
                                    />
                                </div>

                            </>
                        )}

                    </Stack>
                </Container>
            </MainPanel>
        </DashboardLayout>
    );
}

export default DashboardPage;
