import React from "react";
import { Box, Typography } from "@mui/material";
import { ItemViewContext } from "../ItemView";
import { useContext } from "react";

const ItemSideInfo = () => {
    const data = useContext(ItemViewContext);
    const seller = data.seller;
    return (
        <Box sx={{ background: "purple" }}>
            <Typography>
                Seller: {seller.name} {seller.surname}
            </Typography>
            <Typography>Contact: {seller.contact}</Typography>
            <Typography>Country: {seller.country}</Typography>
            <Typography>
                Adress: {seller.city} {seller.street} {seller.houseNo}
            </Typography>
        </Box>
    );
};

export default ItemSideInfo;
