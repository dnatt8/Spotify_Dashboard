import { Typography } from "@mui/material";

type TopbarProps = {
    title: string;
};

function Topbar({ title }: TopbarProps) {
    return (
        <Typography variant="h4" component="h1">
            {title}
        </Typography>
    );
}

export default Topbar;
