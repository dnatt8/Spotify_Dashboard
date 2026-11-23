import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { AlbumType } from "../../types/dashboard";

type AlbumTypeFilterProps = {
    value: AlbumType;
    options: AlbumType[];
    onChange: (type: AlbumType) => void;
};

function AlbumTypeFilter({
    value,
    options,
    onChange
}: AlbumTypeFilterProps) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as AlbumType);
    };

    return (
        <FormControl fullWidth size="small">
            <InputLabel id="album-type-label">
                Tipo de lanzamiento
            </InputLabel>

            <Select
                labelId="album-type-label"
                value={value}
                label="Tipo de lanzamiento"
                onChange={handleChange}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option === "all"
                            ? "Todos"
                            : option === "album"
                              ? "Álbum"
                              : option === "single"
                                ? "Sencillo"
                                : "Recopilación"}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default AlbumTypeFilter;

