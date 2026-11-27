import { Drawer, List, Box } from "@mui/material";
import NavItem from "./NavItem";

import spotifyIcon from "../../assets/spotify-icon.svg";

type SidebarProps = {
    activeSection: string;
    onNavigate: (id: string) => void;
    mobileOpen: boolean;
    onClose: () => void;
};

const navigationItems = [
    { id: "overview", label: "Resumen" },
    { id: "artists", label: "Artistas" },
    { id: "tracks", label: "Canciones" }
];

function Sidebar({
    activeSection,
    onNavigate,
    mobileOpen,
    onClose
}: SidebarProps) {

    const menu = (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 3,
                    px: 2
                }}
            >
                <Box
                    component="img"
                    src={spotifyIcon}
                    alt="Spotify"
                    sx={{
                        width: "160px",
                        maxWidth: "100%",
                        height: "auto"
                    }}
                />
            </Box>

            <List>
                {navigationItems.map((item) => (
                    <NavItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        active={activeSection === item.id}
                        onClick={(id) => {
                            onNavigate(id);
                            onClose();
                        }}
                    />
                ))}
            </List>
        </>
    );

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    width: 240,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: 240,
                        boxSizing: "border-box"
                    }
                }}
            >
                {menu}
            </Drawer>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        width: 240
                    }
                }}
            >
                {menu}
            </Drawer>
        </>
    );
}

export default Sidebar;
