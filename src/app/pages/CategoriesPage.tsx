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
import CategoryItem from "../components/GlobalComponents/AdCard";

type Item2 = {
    id: number; //promjena
    title: string;
    description: string | null; //promjena
    //belongsto: { categoryid: number }[]; //maknuto
    askingprice: number; //promjena
    sellerid: string;
    buyerid?: string | null; //promjena
    conditionid: number;
};

type Item = {
    id: number;
    title: string;
    description: string;
    belongsto: { categoryid: number }[];
    askingprice: string;
    sellerid: string;
    buyerid?: string;
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
    supercategoryid: string | null;
};
type items_and_sellersType = {
    item: Item;
    sellerinfo: User;
};
type CatObjectType = {
    item: Item;
    cat: Category;
};
type Props = {
    categories: Category[];
};

const CategoriesPage = ({ categories }: Props) => {
    //var baseUrl = "http://localhost:3000";
    const [allItems, setAllItems] = useState<CatObjectType[]>([]);
    const [propCategories, setPropCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchItems = async (categoryId: number) => {
        const params = new URLSearchParams();
        params.set("q", "");
        params.set("page", "1");
        params.set("pageSize", "1");
        params.set("categoryId", categoryId.toString());
        //params.set("limit", "1")
        console.log(params.toString());
        try {
            const res = await fetch(
                `http://localhost:3000/api/search?${params}`
            );
            const data = await res.json();
            console.log(data);
            if (Array.isArray(data.data)) {
                return data.data;
            } else {
                return [];
            }
        } finally {
        }
    };

    useEffect(() => {
        async function fetchAllItems() {
            setLoading(true);
            try {
                const allItemsCopy: CatObjectType[] = [];
                for (const category of categories) {
                    const catItem = await fetchItems(category.id);
                    console.log(catItem);
                    const catObject = {
                        item: catItem[0],
                        cat: category,
                    };
                    allItemsCopy.push(catObject); // Append items for the category
                }
                console.log(allItemsCopy);
                setAllItems(allItemsCopy); // Update state once after fetching all items
            } catch (error) {
                console.error("Failed to fetch items:", error);
            } finally {
                setLoading(false);
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
                        {loading && (
                            <Box
                                sx={{
                                    marginTop: 10,
                                    backgroundColor:
                                        theme.palette.secondary.main,
                                    padding: 3,
                                    borderRadius: 2,
                                    fontSize: 30,
                                }}
                            >
                                Kategorije se učitavaju...
                            </Box>
                        )}
                        <Box
                            sx={{
                                mt: 2,
                                display: "grid",
                                gridTemplateColumns: {
                                    sm: "550px", // Single column on extra small screens
                                    md: "repeat(2, 550px)", // Two columns on small screens and up
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
                                        height: "200px",
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
                                    {catObject.item && (
                                        <Box sx={{ p: 2, pt: 0 }}>
                                            <CategoryItem
                                                itemId={catObject.item.id}
                                                title={catObject.item.title}
                                                price={
                                                    catObject.item.askingprice
                                                }
                                                key={index}
                                                categoryObjects={
                                                    catObject.item.belongsto
                                                }
                                                sellerId={
                                                    catObject.item.sellerid
                                                }
                                                checkPage={false}
                                                categories={categories}
                                            />
                                        </Box>
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
