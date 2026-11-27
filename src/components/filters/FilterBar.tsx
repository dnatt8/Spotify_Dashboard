import { Paper, Stack } from "@mui/material";
import type { ReactNode } from "react";

type FilterBarProps = {
    children: ReactNode;
};

function FilterBar({ children }: FilterBarProps) {
    return (
        <Paper elevation={1} sx={{ p:2 }}>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems= "center"
            >
                {children}
            </Stack>
        </Paper>
    );
}

export default FilterBar;
