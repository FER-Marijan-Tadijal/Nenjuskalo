import React from "react";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { ItemViewContext } from "../ItemView";

const ItemTitle = () => {
    const data = useContext(ItemViewContext);
    const item = data.item;
    return (
        <Box
            sx={{
                width: "100%",
                padding: 3,
                paddingLeft: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
            }}
        >
            <Typography variant="h6">• {item.title}</Typography>
            <Typography variant="h6">• Price: {item.price} $</Typography>
            <Typography variant="h6">• Condition: {item.condition}</Typography>
        </Box>
    );
};

export default ItemTitle;
