import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "@/app/styles/theme";

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

type Props = {
    randomItems: Item[];
};

const ExploreRelevantItems = ({ randomItems }: Props) => {
    return (
        <Box
            sx={{
                backgroundColor: theme.palette.secondary.main,
                //position: "fixed",
                //top: 0,
                //right: 0,
                mt: 2,
                padding: 2,
                width: "300px", //PRETVORI U %
                borderRadius: 2,
            }}
        >
            <Typography sx={{ marginBottom: 2 }} variant="h5">
                Relevant Products:
            </Typography>
            <Box>
                {randomItems.map((item, index) => (
                    <Box
                        sx={{
                            margin: 0.5,
                            padding: 1,
                            border: "1px solid grey",
                            borderRadius: 1.5,
                            marginBottom: "auto",
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                                backgroundColor: theme.palette.cardHover.main,
                            },
                        }}
                        key={index}
                    >
                        <Typography
                            component="a"
                            href={`/item?id=${item.id}`}
                            sx={{
                                textDecoration: "none",
                                //color: "#1C2B36",
                            }}
                        >
                            {item.title} - {item.askingprice} €
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ExploreRelevantItems;
