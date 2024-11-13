import React from "react";
import { Box, Typography } from "@mui/material";
import { ItemViewContext } from "../../pages/ItemViewPage";
import { useContext } from "react";
import theme from "@/app/styles/theme";

const ItemSideInfo = () => {
    const data = useContext(ItemViewContext);
    const seller = data.seller;
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
            }}
        >
            <Typography variant="h6">
                • Seller: {seller.name} {seller.surname}
            </Typography>
            <Typography variant="h6">• Contact: {seller.contact}</Typography>
            <Typography variant="h6">• Country: {seller.country}</Typography>
            <Typography variant="h6">
                • Adress: {seller.city} {seller.street} {seller.houseNo}
            </Typography>
        </Box>
    );
};

export default ItemSideInfo;
