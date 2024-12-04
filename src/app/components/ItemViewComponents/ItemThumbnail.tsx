import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ItemViewContext } from "../../pages/ItemViewPage";
import ItemSideInfo from "./ItemSideInfo";

const ItemThumbnail = () => {
    const data = useContext(ItemViewContext);
    const item = data.item;
    const seller = data.seller;
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                p: 2,
            }}
        >
            <img
                src="/images/banner1.jpg"
                alt="Nature image from Unsplash"
                style={{
                    width: "500px",
                    height: "300px",
                    borderRadius: 5,
                }}
            />
            <ItemSideInfo />
        </Box>
    );
};

export default ItemThumbnail;
