import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Stack
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
                                <TableCell key={column.id}>
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
                                    <TableCell key={column.id}>
                                        {row[column.id]}
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
