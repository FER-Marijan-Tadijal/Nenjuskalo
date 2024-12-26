import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import theme from "@/app/styles/theme";
import { getUser } from "@/app/util/getFromId";
import { Decimal } from "@prisma/client/runtime/library";

type categoryType = {
    id: number;
    name: string;
    supercategoryid: number | null;
};
type Props = {
    itemId: number;
    title: string;
    //price: number;
    category: categoryType;
    sellerinfo: User;
};
type User = {
    id: string;
    country: string;
    city: string;
    street: string;
    houseNo: string;
    roleId: string;
};

const CategoryItem = ({
    itemId,
    title,
    //price,
    category,
    sellerinfo,
}: Props) => {
    console.log(sellerinfo);
    return (
        <>
            {sellerinfo && (
                <Box
                    sx={{
                        width: "90%",
                        height: "150px",
                        margin: 0.7,
                        padding: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: 3,
                        border: "1px solid grey",
                        backgroundColor: "#FFFFFF", //nepotrebno?!
                        color: "#1C2B36",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                            backgroundColor: theme.palette.cardHover.main,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "50%",
                            paddingRight: 1,
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fG5hdHVyZXxlbnwwfHx8fDE2MTg4NzU1MjA&ixlib=rb-1.2.1&q=80&w=400"
                            alt="Nature image from Unsplash"
                            style={{
                                width: "100%",
                                height: "auto",
                                maxHeight: "100%",
                                objectFit: "cover",
                                borderRadius: 4,
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                marginTop: 2,
                            }}
                        >
                            <Typography variant="body2">• {title}</Typography>
                            <Typography variant="body2">
                                • Price: {/*price*/} €
                            </Typography>
                            <Typography variant="body2">
                                • Location: {sellerinfo.city || "- "},
                                {sellerinfo.street || " -"}
                            </Typography>
                            <Typography variant="body2">
                                • Category: {category.name}
                            </Typography>
                        </Box>
                        <Button
                            variant="accentBtn"
                            fullWidth
                            href={`/item?id=${itemId}`}
                        >
                            View Details
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default CategoryItem;
