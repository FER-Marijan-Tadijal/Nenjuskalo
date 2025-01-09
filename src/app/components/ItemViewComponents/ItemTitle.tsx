import React from "react";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { conditionEnum } from "@/app/enums/conditionEnum";

type Props = {
    item: {
        itemid: string;
        title: string;
        description: string;
        askingprice: string;
        sellerid: string;
        buyerid?: string;
        conditionid: number;
    };
};

const ItemTitle = ({ item }: Props) => {
    const conditionName =
        conditionEnum[item.conditionid] ?? "unknown condition";
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
                • {item.title}
            </Typography>
            <Typography variant="h6" sx={{ fontStyle: "oblique" }}>
                • Cijena: {item.askingprice} €
            </Typography>
            <Typography variant="h6" sx={{ fontStyle: "oblique" }}>
                • Stanje: {conditionName}
            </Typography>
        </Box>
    );
};

export default ItemTitle;
