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

    if (totalItems === 0) {
        return null;
    }

    const totalPages = Math.ceil(totalItems / pageSize);

    return (
        <Stack
            sx={{
                alignItems: "center",
                py: 1
            }}
        >
            <MuiPagination
                count={totalPages}
                page={page}
                onChange={(_event, newPage) =>
                    onPageChange(newPage)
                }
                color="primary"
                siblingCount={1}
                boundaryCount={1}
            />
        </Stack>
    );
}

export default Pagination;
