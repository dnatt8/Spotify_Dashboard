import { Drawer, List } from "@mui/material";
import NavItem from "./NavItem";

type SidebarProps = {
    activeSection: string;
    onNavigate: (id: string) => void;
    mobileOpen: boolean;
    onClose: () => void;
};

const navigationItems = [
    { id: "overview", label: "Resumen" },
    { id: "tracks", label: "Canciones" },
    { id: "artists", label: "Artistas" }
];

function Sidebar({
    activeSection,
    onNavigate,
    mobileOpen,
    onClose
}: SidebarProps) {

    const menu = (
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