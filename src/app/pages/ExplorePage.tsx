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
                    backgroundColor: "#578BA0",
                    color: "#F1E9DA",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 8,
                    paddingBottom: 1,
                }}
            >
                <Box
                    sx={{
                        marginTop: 2,
                        marginBottom: 1,
                        padding: 1,
                        backgroundColor: "#D9F0FF ",
                        color: "#1C2B36",
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h5">
                        {" "}
                        Search results for: {search}
                    </Typography>
                </Box>
                {exploreItems.map((e, key) => (
                    <ExploreItem
                        title={e.title}
                        price={e.price}
                        city={e.city}
                        street={e.street}
                        category={e.category}
                        key={key}
                    />
                ))}
            </Container>
        </>
    );
};

export default Explore;
