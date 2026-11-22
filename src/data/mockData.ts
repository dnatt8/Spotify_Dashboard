import type {
    KpiItem,
    YearMetrics,
    ArtistSummary,
    ReleaseShare,
    TrackRow
} from "../types/dashboard";


export const mockKpis: KpiItem[] = [
    {
        id: "popularity",
        label: "Popularidad promedio",
        value: "68.5"
    },
    {
        id: "followers",
        label: "Seguidores promedio",
        value: "2.4",
        unit: "M"
    },
    {
        id: "duration",
        label: "Duración promedio",
        value: "3.8",
        unit: "min"
    }
];

export const mockYearMetrics: YearMetrics[] = [
    { year: 2021, popularityAvg: 65, durationAvgMin: 3.6 },
    { year: 2022, popularityAvg: 68, durationAvgMin: 3.7 },
    { year: 2023, popularityAvg: 72, durationAvgMin: 3.5 },
    { year: 2024, popularityAvg: 70, durationAvgMin: 3.8 },
    { year: 2025, popularityAvg: 75, durationAvgMin: 3.9 }
];

export const mockArtists: ArtistSummary[] = [
    { name: "Les Rallizes Dénudés", followers: 250000 },
    { name: "TOOL", followers: 3500000 },
    { name: "Duster", followers: 850000 },
    { name: "Radiohead", followers: 12000000 }
];

export const mockReleaseShares: ReleaseShare[] = [
    { type: "Album", count: 120, percent: 50 },
    { type: "Single", count: 90, percent: 37.5 },
    { type: "Compilation", count: 30, percent: 12.5 }
];

export const mockTracks: TrackRow[] = [
    {
        id: "1",
        track: "Enter the Mirror",
        artist: "Les Rallizes Dénudés",
        album: "77 Live",
        year: 2022,
        popularity: 45,
        explicit: false,
        durationMin: 11.6,
        albumType: "album"
    },
    {
        id: "2",
        track: "Schism",
        artist: "TOOL",
        album: "Lateralus",
        year: 2001,
        popularity: 78,
        explicit: false,
        durationMin: 6.5,
        albumType: "album"
    },
    {
        id: "3",
        track: "Inside Out",
        artist: "Duster",
        album: "Stratosphere",
        year: 1998,
        popularity: 65,
        explicit: false,
        durationMin: 3.8,
        albumType: "album"
    },
    {
        id: "4",
        track: "Weird Fishes/Arpeggi",
        artist: "Radiohead",
        album: "In Rainbows",
        year: 2007,
        popularity: 85,
        explicit: false,
        durationMin: 5.2,
        albumType: "album"
    }
];
