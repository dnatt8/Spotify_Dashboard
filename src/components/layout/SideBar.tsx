import { Drawer, List } from "@mui/material";
import NavItem from "./NavItem";

type SidebarProps = {
    activeSection: string;
    onNavigate: (id: string) => void;
};

const navigationItems = [
    { id: "overview", label: "Resumen" },
    { id: "tracks", label: "Canciones" },
    { id: "artists", label: "Artistas" }
];

function Sidebar({ activeSection, onNavigate }: SidebarProps) {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box"
                }
            }}
        >
            <List>
                {navigationItems.map((item) => (
                    <NavItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        active={activeSection === item.id}
                        onClick={onNavigate}
                    />
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
