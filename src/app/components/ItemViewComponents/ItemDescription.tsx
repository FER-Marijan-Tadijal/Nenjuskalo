import { Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
//import { ItemViewContext } from "../../pages/ItemViewPage";
import theme from "@/app/styles/theme";

interface Prop {
    description: string;
}

const ItemDescription = ({ description }: Prop) => {
    //const data = useContext(ItemViewContext);
    //const description = data.item.description;
    return (
        <Box
            sx={{
                width: "80%",
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.textBlack.main,
                borderRadius: 2,
                padding: 2,
                marginTop: 2,
            }}
        >
            <Typography variant="body1">{description}</Typography>
        </Box>
    );
};

export default ItemDescription;
