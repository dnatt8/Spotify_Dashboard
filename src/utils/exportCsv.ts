
import type { TrackRow } from "../types/dashboard";

// Evita problemas con comas, comillas y saltos de línea.
// También protege frente a fórmulas en hojas de cálculo.
function prepararValor(valor: string | number): string {
    const texto = String(valor ?? "");

    const seguro =
        typeof valor === "string" &&
        /^[\s]*[=+\-@]/.test(texto)
            ? "'" + texto
            : texto;

    return `"${seguro.replace(/"/g, '""')}"`;
}

export function exportarCancionesCSV(
    canciones: TrackRow[],
    anioDesde: number,
    anioHasta: number,
    tipoAlbum: string
): void {

    if (canciones.length === 0) {
        return;
    }

    // Columnas del archivo CSV
    const encabezados = [
        "Canción",
        "Artista",
        "Álbum",
        "Año",
        "Popularidad",
        "Duración (min)"
    ];

    // Convertir las canciones en filas
    const filas = canciones.map((cancion) => [
        cancion.track,
        cancion.artist,
        cancion.album,
        cancion.year,
        cancion.popularity,
        cancion.durationMin
    ]);

    // Generar el contenido CSV
    const contenido = [encabezados, ...filas]
        .map((fila) =>
            fila.map(prepararValor).join(",")
        )
        .join("\r\n");

    // BOM para conservar tildes y caracteres especiales en Excel
    const blob = new Blob(
        ["\uFEFF", contenido],
        { type: "text/csv;charset=utf-8;" }
    );

    // Crear enlace temporal de descarga
    const url = URL.createObjectURL(blob);

    const enlace = document.createElement("a");

    enlace.href = url;
    enlace.download =
        `spotify_${anioDesde}-${anioHasta}_${tipoAlbum}.csv`;

    document.body.appendChild(enlace);

    // Descargar el archivo
    enlace.click();

    // Limpiar recursos temporales
    enlace.remove();

    window.setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 1000);
}
