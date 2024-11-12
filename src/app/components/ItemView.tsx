import { Container } from "@mui/material";
import React from "react";
import ItemThumbnail from "./ItemViewComponents/ItemThumbnail";
import ItemDetails from "./ItemViewComponents/ItemDetails";

type Props = {};

const ItemView = (props: Props) => {
    return (
        <>
            {/* HEADER */}
            <Container
                sx={{ backgroundColor: "white", height: "100vh", padding: 4 }}
            >
                <ItemThumbnail />
                <ItemDetails />
            </Container>
        </>
    );
};

export default ItemView;
