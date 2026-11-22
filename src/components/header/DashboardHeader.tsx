import { Stack, Typography } from "@mui/material";

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
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing= {2}
            >

                <Stack spacing={1} sx={{flexGrow: 1}}>
                    <Topbar title={title} />

                    <Typography variant="body1" color="text.secondary">
                        {subtitle}
                    </Typography>
                </Stack>

                <ExportButton onExport={onExport} />
            </Stack>
    );
}

export default DashboardHeader;
