import { Box, Slider, Typography } from "@mui/material";
import type { YearRange } from "../../types/dashboard";

type YearRangeFilterProps = {
    value: YearRange;
    minYear: number;
    maxYear: number;
    onChange: (range: YearRange) => void;
};

function YearRangeFilter({
    value,
    minYear,
    maxYear,
    onChange
}: YearRangeFilterProps) {

    const handleFromChange = (_event: Event, newValue: number) => {
        onChange({
            from: Math.min(newValue, value.to),
            to: value.to
        });
    };

    const handleToChange = (_event: Event, newValue: number) => {
        onChange({
            from: value.from,
            to: Math.max(newValue, value.from)
        });
    };

    return (
        <Box>
            <Typography variant="subtitle2" gutterBottom>
                Rango de años
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="caption">
                        Desde: {value.from}
                    </Typography>

                    <Slider
                        value={value.from}
                        min={minYear}
                        max={maxYear}
                        step={1}
                        onChange={handleFromChange}
                        valueLabelDisplay="auto"
                    />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="caption">
                        Hasta: {value.to}
                    </Typography>

                    <Slider
                        value={value.to}
                        min={minYear}
                        max={maxYear}
                        step={1}
                        onChange={handleToChange}
                        valueLabelDisplay="auto"
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default YearRangeFilter;

