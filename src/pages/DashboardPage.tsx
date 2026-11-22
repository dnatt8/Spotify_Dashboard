import { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";

import KpiGrid from "../components/kpi/KpiGrid";
import { mockKpis, mockTracks } from "../data/mockData";
import type { AlbumType, YearRange, ColumnConfig } from "../types/dashboard";
import AlbumTypeFilter from "../components/filters/AlbumTypeFilter";
import FilterBar from "../components/filters/FilterBar";
import YearRangeFilter from "../components/filters/YearRangeFilter";
import TrackTable from "../components/table/TrackTable";

import DashboardHeader from "../components/header/DashboardHeader";
import Topbar from "../components/header/TopBar";
import ExportButton from "../components/header/ExportButton";

import Sidebar from "../components/layout/SideBar";
import MainPanel from "../components/layout/MainPanel";
import DashboardLayout from "../components/layout/DashboardLayout";

export const mockTrackColumns: ColumnConfig[] = [
    { id: "track", label: "Canción" },
    { id: "artist", label: "Artista" },
    { id: "album", label: "Álbum" },
    { id: "year", label: "Año" },
    { id: "popularity", label: "Popularidad" },
    { id: "durationMin", label: "Duración (min)" }
];

const anioMin= 1998;
const anioMax= 2025

function DashboardPage() {
    const [albumType, setAlbumType] = useState<AlbumType>("all");
    const [yearRange, setYearRange] = useState<YearRange>({
    	    from: anioMin,
    	    to: anioMax 
	});
    
    const [page, setPage] = useState(1);
    const pageSize = 3;
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    const filteredTracks = mockTracks.filter((track) => {
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
                />
            }
        >
            <MainPanel>
               <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Topbar />

                        <DashboardHeader
                            title="Spotify Dashboard"
                            subtitle="Análisis y estadísticas de música."
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

                        <TrackTable
                            rows={currentTracks}
                            columns={mockTrackColumns}
                            page={page}
                            pageSize={pageSize}
                            totalItems={filteredTracks.length}
                            onPageChange={setPage}
                        />
                    </Stack>
                </Container>
            </MainPanel>
        </DashboardLayout>
    );
}

export default DashboardPage;

