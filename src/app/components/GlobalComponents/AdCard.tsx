import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import theme from "@/app/styles/theme";
import { getUser } from "@/app/util/getFromId";

type Props = {
    itemId: number;
    title: string;
    price: string;
    sellerId: string;
    categoryObjects: { categoryid: number }[];
    categories: {
        id: number;
        name: string;
        supercategoryid: string | null;
    }[];
    checkPage: boolean;
};
type User = {
    id: string;
    country: string;
    city: string;
    street: string;
    houseNo: string;
    roleId: string;
};

const ExploreItem = ({
    itemId,
    title,
    price,
    sellerId,
    categoryObjects,
    categories,
    checkPage,
}: Props) => {
    const [user, setUser] = useState<User>();
    const [itemCategories, setItemCategories] = useState<string[]>([]);
    const categoryIds = categoryObjects.map((obj) => obj.categoryid);
    var check = true;

    const fetchUser = async (userId: string) => {
        const res = await fetch(`/api/getUser?id=${userId}`);
        const userData = await res.json();
        //console.log(userData);
        setUser(userData);
    };

    useEffect(() => {
        if (categories && categories.length > 0 && check) {
            check = false;
            categories.forEach((cat) => {
                if (categoryIds.includes(cat.id)) {
                    setItemCategories((prevCategories) =>
                        prevCategories.concat(cat.name)
                    );
                }
            });
        }
        fetchUser(sellerId);
    }, []);
    return (
        <>
            {user && (
                <Box
                    sx={{
                        width: checkPage ? "55%" : "90%",
                        height: "160px",
                        margin: checkPage ? 0.7 : 0,
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
                            alignItems: "center",
                            width: "50%",
                            height: "100%",
                            paddingRight: 1,
                        }}
                    >
                        <img
                            src={`/api/image?id=${itemId}&index=0`}
                            alt="Nature image from Unsplash"
                            style={{
                                width: "100%",
                                height: "auto",
                                maxHeight: "100%",
                                objectFit: "contain",
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
                                • Cijena: {price} €
                            </Typography>
                            <Typography variant="body2">
                                • Lokacija: {user.city || "- "},
                                {user.street || " -"}
                            </Typography>
                            <Typography variant="body2">
                                • Kategorija: {itemCategories.join(",")}
                            </Typography>
                        </Box>
                        <Button
                            variant="accentBtn"
                            fullWidth
                            href={`/item/${itemId}`}
                        >
                            View Details
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default ExploreItem;
