import React from "react";
import {
    Box,
    Typography,
    FormControl,
    OutlinedInput,
    FormHelperText,
    InputAdornment,
} from "@mui/material";
import theme from "@/app/styles/theme";

type Props = {
    minPrice: string;
    maxPrice: string;
    handleMinPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleMaxPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleMinPriceBlur: () => void;
    handleMaxPriceBlur: () => void;
};

const ExplorePriceRange = ({
    minPrice,
    maxPrice,
    handleMaxPriceBlur,
    handleMaxPriceChange,
    handleMinPriceBlur,
    handleMinPriceChange,
}: Props) => {
    return (
        <Box
            sx={{
                backgroundColor: theme.palette.secondary.main,
                mt: 2,
                mb: 2,
                padding: 2,
                width: "70%",
                borderRadius: 2,
            }}
        >
            <FormControl sx={{ m: 1, width: "90%" }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleMinPriceBlur();
                            event.preventDefault(); // Optional: Prevents form submission if inside a form
                        }
                    }}
                    endAdornment={
                        <InputAdornment position="end">€</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        "aria-label": "weight",
                    }}
                />
                <FormHelperText id="outlined-weight-helper-text">
                    Najniža cijena
                </FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: "90%" }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleMaxPriceBlur();
                            event.preventDefault(); // Optional: Prevents form submission if inside a form
                        }
                    }}
                    endAdornment={
                        <InputAdornment position="end">€</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        "aria-label": "weight",
                    }}
                />
                <FormHelperText id="outlined-weight-helper-text">
                    Najviša cijena
                </FormHelperText>
            </FormControl>
        </Box>
    );
};

export default ExplorePriceRange;
