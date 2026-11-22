import { Box } from "@mui/material";
import type { ReactNode } from "react";

type DashboardLayoutProps = {
    sidebar: ReactNode;
    children: ReactNode;
};

function DashboardLayout({
    sidebar,
    children
}: DashboardLayoutProps) {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {sidebar}
            {children}
        </Box>
    );
}

export default DashboardLayout;
