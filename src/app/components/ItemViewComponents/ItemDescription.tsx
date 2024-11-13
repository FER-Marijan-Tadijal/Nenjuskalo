import { Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { ItemViewContext } from "../ItemView";
import theme from "@/app/styles/theme";

const ItemDescription = () => {
    const data = useContext(ItemViewContext);
    const description = data.item.description;
    return (
        <Box
            sx={{
                width: "70%",
                backgroundColor: theme.palette.secondary.main,
                padding: 2,
            }}
        >
            <Typography variant="body1">{description}</Typography>
        </Box>
    );
};

export default ItemDescription;
