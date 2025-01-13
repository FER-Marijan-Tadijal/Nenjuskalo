import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";
import theme from "@/app/styles/theme";
import type { Session } from "next-auth";

import DeleteAdForm from "@/app/components/forms/DeleteAdForm";
import MarkAsSoldForm from "@/app/components/forms/MarkAsSoldForm";

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
    noOfPictures: number;
};

const ItemThumbnail = ({ user, session, itemId, noOfPictures }: Props) => {
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
                {noOfPictures > 0 && (
                    <Carousel
                        navButtonsAlwaysVisible
                        navButtonsProps={{
                            style: {
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                color: "white",
                            },
                        }}
                    >
                        {Array.from(
                            { length: noOfPictures },
                            (_, pictureNum) => (
                                <Box
                                    key={pictureNum}
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
                                        key={pictureNum}
                                        src={`/api/image?id=${itemId}&index=${pictureNum}`}
                                        alt="item thumbnail image"
                                        layout="fill"
                                        objectFit="contain"
                                        priority
                                    />
                                </Box>
                            )
                        )}
                    </Carousel>
                )}
                {noOfPictures == 0 && (
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
                            border: "1px solid black",
                        }}
                    >
                        <Typography variant="h4" fontStyle="oblique">
                            Nema slike za ovaj oglas
                        </Typography>
                    </Box>
                )}
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
                        href={`/editAd/${itemId}`}
                    >
                        Ažuriraj oglas
                    </Button>
                )}
                {check && <DeleteAdForm id={Number(itemId)} />}
                {!check && (
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        href={`/message/${user.id}`}
                    >
                        Pošalji poruku
                    </Button>
                )}
                {check && <MarkAsSoldForm id={Number(itemId)} />}
                {!check && (
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            backgroundColor: theme.palette.accent.main,
                        }}
                        href={`/`} //TU NAMJESTITI RUTU ZA PAYMENT
                    >
                        Kupi
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ItemThumbnail;
