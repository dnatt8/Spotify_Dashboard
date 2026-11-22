import { ListItemButton, ListItemText } from "@mui/material";

type NavItemProps = {
    id: string;
    label: string;
    active: boolean;
    onClick: (id: string) => void;
};

function NavItem({ id, label, active, onClick }: NavItemProps) {
    return (
        <ListItemButton
            selected={active}
            onClick={() => onClick(id)}
        >
            <ListItemText primary={label} />
        </ListItemButton>
    );
}

export default NavItem;
