import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Stack,
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
        <Stack spacing={2}>
            <TableContainer component={Paper}>
                <Table>	
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                        sx={{
                                        display: {
                                        xs: ["track", "year", "popularity"].includes(column.id)
                                        ? "table-cell"
                                        : "none",
                                        sm: "table-cell"
                                        },
                                        px: { xs: 1, sm: 2 }
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

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        sx={{
                                            display: {
                                                xs: ["track", "year", "popularity"].includes(column.id)
                                                    ? "table-cell"
                                                    : "none",
                                                sm: "table-cell"
                                            },
                                            px: { xs: 1, sm: 2 },
                                            overflowWrap: "anywhere"
                                        }}
                                    >
                                        {column.id === "track" ? (
                                            <>
                                                {row.track}
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{
                                                        display: { xs: "block", sm: "none" }
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

	    <Pagination
            	page={page}
            	pageSize={pageSize}
            	totalItems={totalItems}
            	onPageChange={onPageChange}
            />
	    
	</Stack>
    );
}

export default TrackTable;
