import { Pagination as MuiPagination, Stack } from "@mui/material";

type PaginationProps = {
    page: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
};

function Pagination({
    page,
    pageSize,
    totalItems,
    onPageChange
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / pageSize);

    return (
        <Stack alignItems="center">
            <MuiPagination
                count={totalPages}
                page={page}
                onChange={(_event, newPage) => onPageChange(newPage)}
                color="primary"
            />
        </Stack>
    );
}

export default Pagination;

