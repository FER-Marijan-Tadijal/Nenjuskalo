import React from "react";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
//import { ItemViewContext } from "../../pages/ItemViewPage";

interface Prop {
    item: {
        title: string;
        price: number;
        description: string;
        condition: string;
    };
}

const ItemTitle = ({ item }: Prop) => {
    //const data = useContext(ItemViewContext);
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
            <Typography variant="h6">• {item.title}</Typography>
            <Typography variant="h6">• Price: {item.price} $</Typography>
            <Typography variant="h6">• Condition: {item.condition}</Typography>
        </Box>
    );
};

export default ItemTitle;
