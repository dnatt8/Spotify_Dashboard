import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography
} from "@mui/material";

import type {
    ColumnConfig,
    TrackRow
} from "../../types/dashboard";

import Pagination from "./Pagination";

type TrackTableProps = {
    rows: TrackRow[];
    columns: ColumnConfig[];
    sortBy?: string;
    onSort?: (key: string) => void;
    page: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
};

// Columnas que se mantienen visibles en celulares
const mobileColumns = ["track", "year", "popularity"];

// Columnas numéricas alineadas a la derecha
const numericColumns = ["year", "popularity", "durationMin"];

function TrackTable({
    rows,
    columns,
    sortBy,
    onSort,
    page,
    pageSize,
    totalItems,
    onPageChange
}: TrackTableProps) {

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6">
                Lista de canciones
            </Typography>

            <Typography variant="body2" color="text.secondary">
                Canciones populares del rango de años escogido.
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table
                    size="small"
                    sx={{
                        tableLayout: "fixed",
                        width: "100%"
                    }}
                >
                    {/* ENCABEZADOS */}
                    <TableHead>
                        <TableRow sx = {{ backgroundColor: "#22C55E", "& .MuiTableCell-root":
                            {color: "#ffffff",
                            fontWeight: "bold"
                            } }}>
                            
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    scope="col"
                                    align={
                                        numericColumns.includes(column.id)
                                            ? "right"
                                            : "left"
                                    }
                                    sx={{
                                        display: {
                                            xs: mobileColumns.includes(column.id)
                                                ? "table-cell"
                                                : "none",
                                            sm: "table-cell"
                                        },
                                        width:
                                            column.id === "track"
                                                ? { xs: "47%", sm: "19%" }
                                            : column.id === "artist"
                                                ? "18%"
                                            : column.id === "album"
                                                ? "21%"
                                            : column.id === "year"
                                                ? { xs: "18%", sm: "10%" }
                                            : column.id === "popularity"
                                                ? { xs: "35%", sm: "20%" }
                                            : "12%",
                                        px: { xs: 1, sm: 2 },
                                        py: 2,
                                        overflowWrap: "anywhere",
                                        verticalAlign: "middle"
                                    }}
                                >
                                    {onSort ? (
                                        <TableSortLabel
                                            active={sortBy === column.id}
                                            onClick={() => onSort(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    {/* FILAS DE CANCIONES */}
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                hover
                            >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={
                                            numericColumns.includes(column.id)
                                                ? "right"
                                                : "left"
                                        }
                                        sx={{
                                            display: {
                                                xs: mobileColumns.includes(column.id)
                                                    ? "table-cell"
                                                    : "none",
                                                sm: "table-cell"
                                            },
                                            px: { xs: 1, sm: 2 },
                                            py: 1.5,
                                            overflowWrap: "anywhere",
                                            verticalAlign: "middle",
                                            fontVariantNumeric: "tabular-nums"
                                        }}
                                    >
                                        {column.id === "track" ? (
                                            <>
                                                {row.track}

                                                {/* Artista debajo de la canción en móvil */}
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{
                                                        display: {
                                                            xs: "block",
                                                            sm: "none"
                                                        },
                                                        mt: 0.5
                                                    }}
                                                >
                                                    {row.artist}
                                                </Typography>
                                            </>
                                        ) : (
                                            row[column.id]
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* PAGINACIÓN */}
            <Pagination
                page={page}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={onPageChange}
            />
        </Paper>
    );
}

export default TrackTable;
