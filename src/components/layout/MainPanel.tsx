import { Box } from "@mui/material";
import type { ReactNode } from "react";

type MainPanelProps = {
    children: ReactNode;
};

function MainPanel({ children }: MainPanelProps) {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {children}
        </Box>
    );
}

export default MainPanel;
