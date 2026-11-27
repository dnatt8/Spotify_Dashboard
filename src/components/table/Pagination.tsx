
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
                sx={{
                    "& .MuiPaginationItem-root": {
                        color: "#ffffff",
                        fontWeight: 500
                    },

                    "& .MuiPaginationItem-root:hover": {
                        backgroundColor: "rgba(255,255,255,0.15)"
                    },

                    "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "#1976d2",
                        color: "#ffffff"
                    },

                    "& .MuiPaginationItem-root.Mui-selected:hover": {
                        backgroundColor: "#1565c0"
                    },

                    "& .MuiPaginationItem-root.Mui-disabled": {
                        color: "#ffffff",
                        opacity: 0.35
                    }
                }}
            />
        </Stack>
    );
}

export default Pagination;
