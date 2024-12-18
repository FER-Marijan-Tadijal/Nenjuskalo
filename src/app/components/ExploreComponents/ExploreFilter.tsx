import React from "react";
import {
    Box,
    Typography,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import theme from "@/app/styles/theme";

type filterOption = {
    name: string;
    id: number;
};

type Props = {
    filterName: string;
    filter: string;
    onChange: (event: SelectChangeEvent<string>) => void;
    filterOptions: filterOption[];
};

const ExploreFilter = ({
    filterName,
    filter,
    onChange,
    filterOptions,
}: Props) => {
    return (
        <Box
            sx={{
                backgroundColor: theme.palette.secondary.main,
                mt: 2,
                padding: 2,
                width: "300px",
                borderRadius: 2,
            }}
        >
            <Typography sx={{ marginBottom: 2 }} variant="h5">
                Filter by {filterName}:
            </Typography>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="select-label">Choose {filterName}</InputLabel>
                <Select
                    labelId="select-label"
                    value={filter}
                    onChange={onChange}
                >
                    <MenuItem value={""}>-No {filterName}-</MenuItem>
                    {filterOptions.map((fo, index) => (
                        <MenuItem key={index} value={fo.id}>
                            {fo.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default ExploreFilter;
