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
                width: "70%",
                borderRadius: 2,
            }}
        >
            <FormControl fullWidth variant="outlined">
                <InputLabel
                    id="select-label"
                    shrink={false}
                    //sx={{ fontWeight: "semibold" }}
                >
                    {filterName}
                </InputLabel>
                <Select
                    labelId="select-label"
                    value={filter}
                    onChange={onChange}
                >
                    <MenuItem value={""}>-Bez filtera-</MenuItem>
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
