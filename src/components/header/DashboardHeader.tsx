
import { Stack, Typography, Box } from "@mui/material";
import Topbar from "./TopBar";
import ExportButton from "./ExportButton";

type DashboardHeaderProps = {
    title: string;
    subtitle: string;
    onExport: () => void;
};

function DashboardHeader({
    title,
    subtitle,
    onExport
}: DashboardHeaderProps) {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
                justifyContent: "space-between",
                alignItems: {
                    xs: "flex-start",
                    sm: "center"
                },
                textAlign: {
                    xs: "left",
                    sm: "center"
                }
            }}
        >
            <Stack spacing={1} sx={{ flexGrow: 1, minWidth: 0 }}>
                <Topbar title={title} />

                <Typography
                    variant="body1"
                    color="text.secondary"
                >
                    {subtitle}
                </Typography>
            </Stack>

            <Box sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}>
                <ExportButton onExport={onExport} />
            </Box>
        </Stack>
    );
}

export default DashboardHeader;
