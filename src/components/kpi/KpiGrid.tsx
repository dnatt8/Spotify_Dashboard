import { Grid } from "@mui/material";
import type { KpiItem } from "../../types/dashboard";
import KpiCard from "./KpiCard";

type KpiGridProps = {
    items: KpiItem[];
};

function KpiGrid({ items }: KpiGridProps) {
    return (
        <Grid container spacing={2}>
            {items.map((item) => (
                <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <KpiCard
                        label={item.label}
                        value={item.value}
                        unit={item.unit}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default KpiGrid;

