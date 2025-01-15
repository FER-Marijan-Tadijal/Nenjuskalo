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
                padding: 0.5,
                paddingBottom: 0,
                width: "70%",
                minWidth: "120px",
                borderRadius: 2,
            }}
        >
            <FormControl sx={{ m: 0.5, width: "90%" }} variant="outlined">
                <OutlinedInput
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
            <FormControl sx={{ m: 0.5, width: "90%" }} variant="outlined">
                <OutlinedInput
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
