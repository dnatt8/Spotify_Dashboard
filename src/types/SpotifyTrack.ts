export interface SpotifyTrack {
  id: string;
  track_name: string;
  track_popularity: number;
  explicit: boolean;
  artist_name?: string;
  artist_popularity: number;
  artist_followers: number;
  artist_genres?: string;
  album_name: string;
  album_release_date: string;
  album_type: string;
  track_duration_min: number;
}
