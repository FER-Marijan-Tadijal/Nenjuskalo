import React from "react";
import { Box, Container, Typography } from "@mui/material";
import ExploreItem from "../components/ExploreComponents/ExploreItem";
import { title } from "process";
import theme from "../styles/theme";

const exploreItems = [
    {
        title: "Mercedes Benz S-class 2020",
        price: 98000,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "luxury cars",
    },
    {
        title: "Mercedes Benz S-class 2020",
        price: 98000,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "luxury cars",
    },
    {
        title: "Mercedes Benz S-class 2020",
        price: 98000,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "luxury cars",
    },
    {
        title: "Mercedes Benz S-class 2020",
        price: 98000,
        city: "Zagreb",
        street: "Donji Dupci",
        category: "luxury cars",
    },
];
const search = "Mercedes car";

const Explore = () => {
    const items = {};
    return (
        <>
            <Container
                sx={{
                    backgroundColor: theme.palette.primary.light,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        marginTop: 2,
                        marginBottom: 1,
                        padding: 2,
                        backgroundColor: theme.palette.success.main,
                        borderRadius: 5,
                    }}
                >
                    <Typography variant="h5">
                        {" "}
                        Search results for: {search}
                    </Typography>
                </Box>
                {exploreItems.map((e) => (
                    <ExploreItem
                        title={e.title}
                        price={e.price}
                        city={e.city}
                        street={e.street}
                        category={e.category}
                    />
                ))}
            </Container>
        </>
    );
};

export default Explore;
