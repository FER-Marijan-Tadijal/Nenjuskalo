import React from "react";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { conditionEnum } from "@/app/enums/conditionEnum";
import { category, item, itemchangestate } from "@prisma/client";

type BigItem = {
    item: item,
    categories: category[],
    state: itemchangestate[],
    noOfPictures: number,
}

const ItemTitle = ({ bigItem }: { bigItem: BigItem }) => {
    const conditionName =
        conditionEnum[bigItem.item.conditionid] ?? "unknown condition";
    return (
        <Box
            sx={{
                width: "100%",
                padding: 2,
                paddingLeft: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                //borderBottom: "3px solid ",
                //borderColor: "#003049",
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
                • {bigItem.item.title}
            </Typography>
            <Typography variant="h6" sx={{ fontStyle: "oblique" }}>
                • Cijena: {bigItem.item.askingprice.toString()} €
            </Typography>
            <Typography variant="h6" sx={{ fontStyle: "oblique" }}>
                • Stanje: {conditionName}
            </Typography>
            <Typography variant="h6" sx={{ fontStyle: "oblique" }}>
                • Kategorije: {bigItem.categories.map((category) => category.name + "  ")}
            </Typography>
        </Box>
    );
};

export default ItemTitle;
