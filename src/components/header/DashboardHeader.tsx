import { Stack, Typography } from "@mui/material";

type DashboardHeaderProps = {
    title: string;
    subtitle: string;
};

function DashboardHeader({
    title,
    subtitle
}: DashboardHeaderProps) {
    return (
        <Stack spacing={1}>
            <Typography variant="h4" component="h1">
                {title}
            </Typography>

            <Typography variant="body1" color="text.secondary">
                {subtitle}
            </Typography>
        </Stack>
    );
}

export default DashboardHeader;
