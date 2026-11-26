import { useEffect, useState } from "react";
import { obtenerTracks } from "../services/spotifyService";
import type { SpotifyTrack } from "../types/SpotifyTrack";

export default function useSpotifyData() {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        setLoading(true);
        const datos = await obtenerTracks();
        setTracks(datos);
      } catch (error) {
        setError("No se pudieron obtener las canciones.");
      } finally {
        setLoading(false);
      }
    }

    cargarDatos();
  }, []);

  return { tracks, loading, error };
}

