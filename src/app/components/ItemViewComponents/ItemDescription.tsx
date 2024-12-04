import { Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { ItemViewContext } from "../../pages/ItemViewPage";
import theme from "@/app/styles/theme";

const ItemDescription = () => {
    const data = useContext(ItemViewContext);
    const description = data.item.description;
    return (
        <Box
            sx={{
                width: "70%",
                backgroundColor: "#AED5F2 ",
                borderRadius: 2,
                padding: 2,
            }}
        >
            <Typography variant="body1">{description}</Typography>
        </Box>
    );
};

export default ItemDescription;
