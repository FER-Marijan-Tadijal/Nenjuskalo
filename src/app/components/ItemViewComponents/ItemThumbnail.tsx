import React from "react";
import { Box, Typography } from "@mui/material";
//import carImage from "../../../assets/carImage.jpg";
import placeholderImage from "../../../../public/file.svg";
import ItemSideInfo from "./ItemSideInfo";

type Props = {};

const ItemThumbnail = (props: Props) => {
    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: "red",
                display: "flex",
                justifyContent: "space-between",
                p: 2,
            }}
        >
            <Box>
                <img src={placeholderImage} />
                <Typography>Item title</Typography>
            </Box>
            <ItemSideInfo />
        </Box>
    );
};

export default ItemThumbnail;
