import React, { useEffect } from "react";
import {
    Typography,
    Container,
    Box,
    ThemeProvider,
    Button,
} from "@mui/material";
import { useState } from "react";
import theme from "../styles/theme";
import CategoryItem from "../components/CategoryViewComponents/CategoryItem";

type Item = {
    id: number; //promjena
    title: string;
    description: string | null; //promjena
    //belongsto: { categoryid: number }[]; //maknuto
    askingprice: number; //promjena
    sellerid: string;
    buyerid?: string | null; //promjena
    conditionid: number;
};
type User = {
    seller1: {
        name: string | null;
        id: string;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    seller2: {
        id: string;
        country: string | null;
        city: string | null;
        street: string | null;
        houseno: string | null;
        roleid: number;
    };
};
type Category = {
    id: number;
    name: string;
    supercategoryid: number | null;
};
type items_and_sellersType = {
    item: Item;
    sellerinfo: User;
};
type CatObjectType = {
    catItemsAndSellers: items_and_sellersType[];
    cat: Category;
};
type Props = {
    categories: Category[];
};

const CategoriesPage = ({ categories }: Props) => {
    var baseUrl = "http://localhost:3000";
    const [allItems, setAllItems] = useState<CatObjectType[]>([]);

    async function getItemsAndSellers(categoryId: number) {
        try {
            var res = await fetch(
                `${baseUrl}/api/getItemsByCategoryId?id=${categoryId}&orderBy=newest&pageNum=1`
            );
            //&orderBy=${sort_method}&pageNum=${pageNum}
            if (res) {
                var itemsjson = await res.json();
                if (itemsjson.finalItems) return itemsjson.finalItems;
                else return [];
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        async function fetchAllItems() {
            try {
                const allItemsCopy: CatObjectType[] = [];
                for (const category of categories) {
                    const catItems = await getItemsAndSellers(category.id);
                    console.log(catItems);
                    if (catItems.length > 1) catItems.length = 1;
                    const catObject = {
                        catItemsAndSellers: catItems,
                        cat: category,
                    };
                    allItemsCopy.push(catObject); // Append items for the category
                }
                setAllItems(allItemsCopy); // Update state once after fetching all items
            } catch (error) {
                console.error("Failed to fetch items:", error);
            }
        }
        fetchAllItems();
    }, [categories]);

    return (
        <>
            {categories && (
                <ThemeProvider theme={theme}>
                    {/*<Button
                            variant="accentBtn"
                            href={"/"}
                            sx={{ position: "absolute", top: 0, rigth: 0 }}
                        >
                            Go to front page
                        </Button>*/}

                    <Container
                        sx={{
                            mt: 9,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                padding: 2,
                                borderRadius: 2,
                                backgroundColor: theme.palette.accent.main,
                            }}
                        >
                            <Typography
                                variant="h3"
                                fontStyle="oblique"
                                fontWeight="600"
                            >
                                Kategorije:
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                mt: 2,
                                display: "grid",
                                gridTemplateColumns: {
                                    sm: "500px", // Single column on extra small screens
                                    md: "repeat(2, 500px)", // Two columns on small screens and up
                                },
                                gap: 2, // Spacing between items
                                //backgroundColor: theme.palette.secondary.main,
                                //borderRadius: 2,
                            }}
                        >
                            {allItems.map((catObject, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        height: "180px",
                                        display: "flex",
                                        alignContent: "center",
                                        justifyContent: "space-between",
                                        border: "2px solid",
                                        borderRadius: 2,
                                        borderColor: theme.palette.primary.main,
                                        //backgroundColor: theme.palette.secondary.main,
                                        padding: 1,
                                        margin: 1,
                                    }}
                                >
                                    <Button
                                        variant="categoryBtn"
                                        sx={{ width: "150px", height: "80px" }}
                                        href={`/categories/${catObject.cat.id}`}
                                    >
                                        {catObject.cat.name}
                                    </Button>

                                    {catObject.catItemsAndSellers.map(
                                        (itemAndSeller, index) => (
                                            <Box
                                                key={index}
                                                sx={{ p: 2, pt: 0 }}
                                            >
                                                <CategoryItem
                                                    itemId={
                                                        itemAndSeller.item.id
                                                    }
                                                    title={
                                                        itemAndSeller.item.title
                                                    }
                                                    price={
                                                        itemAndSeller.item
                                                            .askingprice
                                                    }
                                                    key={index}
                                                    category={catObject.cat}
                                                    sellerinfo={
                                                        itemAndSeller.sellerinfo
                                                    }
                                                />
                                            </Box>
                                        )
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Container>
                </ThemeProvider>
            )}
        </>
    );
};

export default CategoriesPage;
