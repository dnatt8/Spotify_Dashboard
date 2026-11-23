import { Box } from "@mui/material";
import type { ReactNode } from "react";

type MainPanelProps = {
    children: ReactNode;
};

function MainPanel({ children }: MainPanelProps) {
    return (
        <Box
            component="main"
            sx={{
                flex: 1,
                minWidth: 0,
                p: { xs: 1.5, sm: 2, md: 3 }
            }}
        >
            {children}
        </Box>
    );
}

export default MainPanel;
