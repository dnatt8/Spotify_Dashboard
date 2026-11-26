import { get, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import type { SpotifyTrack } from "../types/SpotifyTrack";

export async function obtenerTracks(): Promise<SpotifyTrack[]> {
  const referencia = ref(database, "/");

  const snapshot = await get(referencia);

  if (snapshot.exists()) {
    const datos = snapshot.val();

    return Object.entries(datos).map(([id, track]) => ({
      id,
      ...(track as SpotifyTrack)
    }));
  }

  return [];
}

