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
    itemId: string;
};

const ItemThumbnail = ({ user, session, itemId }: Props) => {
    const [check, setCheck] = useState(false);

    useEffect(() => {
        if (session?.user?.id == user.id) {
            setCheck(true);
        }
    }, []);

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
                <Box
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
                        src={`/api/image?id=${itemId}&index=0`}
                        alt="item thumbnail image"
                        layout="fill"
                        objectFit="contain"
                        priority
                    />
                </Box>
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
                    • Adresa: {user.city}, {user.street} {user.houseno}
                </Typography>
                {check && (
                    <Button
                        variant="contained"
                        sx={{ mt: 2, backgroundColor: "grey" }}
                        href={`/message/${user.id}`}
                    >
                        Ažuriraj oglas
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
                {!check && (
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            backgroundColor: theme.palette.accent.main,
                        }}
                        href={`/`}
                    >
                        Kupi
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ItemThumbnail;
