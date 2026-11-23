
export type YearRange = {
    from: number;
    to: number;
};

export type AlbumType = "all" | "album" | "single" | "compilation";

export type YearMetrics = {
    year: number;
    popularityAvg: number;
    durationAvgMin: number;
};

export type ArtistSummary = {
    name: string;
    followers: number;
};

export type ReleaseShare = {
    type: string;
    count: number;
    percent: number;
};

export type KpiItem = {
    id: string;
    label: string;
    value: string;
    unit?: string;
};

export type TrackRow = {
    id: string;
    track: string;
    artist: string;
    album: string;
    year: number;
    popularity: number;
    explicit: boolean;
    durationMin: number;
    albumType: string;
};

export type ColumnConfig = {
    id: keyof TrackRow;
    label: string;
};
