import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";
import theme from "@/app/styles/theme";
import type { Session } from "next-auth";

type Props = {
    user: {
        id: string;
        name: string;
        surname: string;
        email: string;
        googleId: string;
        password?: string;
        country?: string;
        city?: string;
        street?: string;
        houseno?: string;
        registerTime: string;
        role: string;
    };
    session: Session | null;
};

const ItemThumbnail = ({ user, session }: Props) => {
    const [check, setCheck] = useState(false);
    useEffect(() => {
        if (session?.user?.id == user.id) {
            setCheck(true);
        }
    }, []);

    console.log(user);
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
                    • Prodavač: {user.name} {user.surname}
                </Typography>
                <Typography variant="body1">• Email: {user.email}</Typography>
                <Typography variant="body1">
                    • Zemlja: {user.country}
                </Typography>
                <Typography variant="body1">
                    • Adresa: {user.city} {user.street} {user.houseno}
                </Typography>
                {check && (
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        href={`/message/${user.id}`}
                    >
                        Pošalji poruku
                    </Button>
                )}
                {!check && (
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        href={`/message/${user.id}`}
                    >
                        Pošalji poruku
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ItemThumbnail;
