import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";

//import { ItemViewContext } from "../../pages/ItemViewPage";

interface Prop {
    seller: {
        name: string;
        surname: string;
        contact: string;
        country: string;
        city: string;
        street: string;
        houseNo: string;
    };
}

const ItemThumbnail = ({ seller }: Prop) => {
    //const data = useContext(ItemViewContext);
    //const item = data.item;
    //const seller = data.seller;
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                p: 2,
                pb: 0,
            }}
        >
            <Box sx={{ width: "70%" }}>
                <Carousel
                    navButtonsAlwaysVisible
                    navButtonsProps={{
                        style: {
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                        },
                    }}
                    indicators={true}
                >
                    {[
                        {
                            image: "/images/banner1.jpg",
                            title: "image1",
                        },
                        {
                            image: "/images/banner2.jpg",
                            title: "image2",
                        },
                    ].map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                width: "100%",
                                height: "400px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                borderRadius: 2,
                            }}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                layout="fill"
                                objectFit="cover"
                                priority
                            />
                        </Box>
                    ))}
                </Carousel>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "left",
                    p: 4,
                }}
            >
                <Typography variant="body1">
                    • Seller: {seller.name} {seller.surname}
                </Typography>
                <Typography variant="body1">
                    • Contact: {seller.contact}
                </Typography>
                <Typography variant="body1">
                    • Country: {seller.country}
                </Typography>
                <Typography variant="body1">
                    • Adress: {seller.city} {seller.street} {seller.houseNo}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
                    Message Seller
                </Button>
            </Box>
        </Box>
    );
};

export default ItemThumbnail;
