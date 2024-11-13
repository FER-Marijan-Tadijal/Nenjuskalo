import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ItemViewContext } from "../ItemView";
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
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fG5hdHVyZXxlbnwwfHx8fDE2MTg4NzU1MjA&ixlib=rb-1.2.1&q=80&w=400"
                alt="Nature image from Unsplash"
                style={{
                    width: "700px",
                    height: "400px",
                    borderRadius: 10,
                }}
            />
            <ItemSideInfo />
        </Box>
    );
};

export default ItemThumbnail;
