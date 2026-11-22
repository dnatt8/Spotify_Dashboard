import { AppBar, Toolbar, Typography } from "@mui/material";

function Topbar() {
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
                <Typography variant="h6" component="div">
                    Spotify Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Topbar;
