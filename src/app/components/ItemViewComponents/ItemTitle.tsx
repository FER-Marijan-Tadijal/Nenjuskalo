import React from "react";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
//import { ItemViewContext } from "../../pages/ItemViewPage";

type Props = {
    item: {
        itemid: string;
        title: string;
        description: string;
        askingprice: string;
        sellerid: string;
        buyerid?: string;
        condition: ["new", "used"];
    };
};

const ItemTitle = ({ item }: Props) => {
    //const item = data.item;
    return (
        <Box
            sx={{
                width: "100%",
                padding: 3,
                paddintTop: 0,
                paddingLeft: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                //borderBottom: "3px solid ",
                //borderColor: "#003049",
            }}
        >
            <Typography variant="h4" sx={{ fontStyle: "italic" }}>
                • {item.title}
            </Typography>
            <Typography variant="h6" sx={{ fontStyle: "oblique" }}>
                • Price: {item.askingprice} $
            </Typography>
            <Typography variant="h6" sx={{ fontStyle: "oblique" }}>
                • Condition: {item.condition}
            </Typography>
        </Box>
    );
};

export default ItemTitle;
