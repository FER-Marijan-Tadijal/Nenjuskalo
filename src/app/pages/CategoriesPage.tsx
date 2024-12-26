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
    id: number;
    title: string;
    description: string;
    belongsto: { categoryid: number }[];
    askingprice: string;
    sellerid: string;
    buyerid?: string;
    conditionid: number;
};
type CatObjectType = { catItems: Item[]; cat: Category };
type Category = {
    id: number;
    name: string;
};
type Props = {
    categories: Category[];
};

const CategoriesPage = ({ categories }: Props) => {
    const [allItems, setAllItems] = useState<CatObjectType[]>([]);

    async function fetchItems(categoryId: string): Promise<Item[]> {
        const params = new URLSearchParams();
        if (categoryId) params.set("categoryId", categoryId);
        console.log(params.toString());
        const res = await fetch(`http://localhost:3000/api/search?${params}`);
        const data = await res.json();

        if (Array.isArray(data.data)) {
            return data.data;
        } else {
            return [];
        }
    }

    useEffect(() => {
        async function fetchAllItems() {
            try {
                const allItemsCopy: CatObjectType[] = [];
                for (const category of categories) {
                    const catItems = await fetchItems(category.id.toString());
                    const catObject = {
                        catItems: catItems,
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

                    <Container sx={{ mt: 8 }}>
                        <Typography
                            variant="h3"
                            fontStyle="oblique"
                            fontWeight="600"
                        >
                            Kategorije:
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                mt: 2,
                            }}
                        >
                            {allItems.map((catObject, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        height: "100px",
                                        display: "flex",
                                        alignContent: "center",
                                        justifyContent: "space-around",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        href={`/categories/${catObject.cat.id}`}
                                        sx={{
                                            width: "150px",
                                            height: "80px",
                                            borderRadius: "16px",
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                            fontFamily: "'Poppins', sans-serif",
                                            color: "white",
                                            backgroundColor: "#003049",
                                            boxShadow:
                                                "0px 4px 12px rgba(0, 0, 0, 0.2)",
                                            "&:hover": {
                                                backgroundColor: "#1c4a6e",
                                                transform: "scale(1.05)",
                                                boxShadow:
                                                    "0px 6px 15px rgba(0, 0, 0, 0.3)",
                                            },
                                            transition:
                                                "transform 0.2s ease-in-out",
                                        }}
                                    >
                                        {catObject.cat.name}
                                    </Button>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignContent: "center",
                                            justifyContent: "space-around",
                                        }}
                                    >
                                        {catObject.catItems.map(
                                            (item, index) => (
                                                <CategoryItem
                                                    itemId={item.id}
                                                    title={item.title}
                                                    //price={el.item.askingprice}
                                                    key={index}
                                                    category={category}
                                                    sellerinfo={item.sellerid}
                                                />
                                            )
                                        )}
                                    </Box>
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
