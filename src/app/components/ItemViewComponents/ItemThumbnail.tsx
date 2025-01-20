import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";
import theme from "@/app/styles/theme";
import type { Session } from "next-auth";
import DeleteAdForm from "@/app/components/forms/DeleteAdForm";
import MarkAsSoldForm from "@/app/components/forms/MarkAsSoldForm";
import { handleCheckout } from "@/app/functions/handleCheckout";

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
    const [ownProfile, setOwnProfile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [imagesArray] = useState(
        Array.from({ length: noOfPictures }, (_, index) => index)
    );
    const [loadingPayment, setLoadingPayment] = useState<boolean | undefined>(
        undefined
    );
    const buyerId = session?.user?.id || "errWithSession";

    useEffect(() => {
        if (session?.user?.id == user.id) {
            setOwnProfile(true);
        }
        if (session?.user) {
            setIsLoggedIn(true);
        }
        console.log(imagesArray);
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
                        {imagesArray.map((imageNo) => (
                            <Box
                                key={imageNo}
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
                                    src={`/api/image?id=${itemId}&index=${imageNo}`}
                                    alt={`item thumbnail image ${imageNo}`}
                                    layout="fill"
                                    objectFit="contain"
                                    priority={imageNo === 0}
                                />
                            </Box>
                        ))}
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
                    p: 3,
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

                {ownProfile && (
                    <Button
                        variant="contained"
                        sx={{
                            width: "100%",
                            backgroundColor: "grey",
                            mt: 3,
                            "&:hover": {
                                backgroundColor: "#4B4B4B",
                            },
                        }}
                        href={`/editAd/${itemId}`}
                    >
                        Ažuriraj oglas
                    </Button>
                )}
                {ownProfile && <DeleteAdForm id={Number(itemId)} />}
                {ownProfile && <MarkAsSoldForm id={Number(itemId)} />}
                {!ownProfile && isLoggedIn && (
                    <Button
                        variant="contained"
                        sx={{ mt: 5 }}
                        href={`/message/${user.id}`}
                    >
                        Pošalji poruku
                    </Button>
                )}
                {!ownProfile && isLoggedIn && (
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            backgroundColor: theme.palette.accent.main,
                        }}
                        onClick={async () => {
                            setLoadingPayment(true);
                            let err = await handleCheckout(itemId, buyerId);
                            if (err) {
                                // if err === true, then the payment was unsuccessful
                                err = await handleCheckout(itemId, buyerId); // This needs to be here as a workaround because function sometimes only works on the second try
                            }
                            if (err) {
                                setLoadingPayment(false);
                            }
                        }}
                    >
                        {loadingPayment ? (
                            <CircularProgress size={24} />
                        ) : (
                            <Typography>Kupi</Typography>
                        )}
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ItemThumbnail;
