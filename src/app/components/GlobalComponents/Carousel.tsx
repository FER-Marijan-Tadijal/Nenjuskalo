import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';

const CarouselComponent = () => {
    const titleStyle = {
        fontSize: '2rem',
        fontWeight: 'bold',
    };

    return (
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
                { image: "/images/carousel1.png", title: "Lako do najboljih cijena" },
                { image: "/images/carousel2.png", title: "Jednostavna komunikacija" },
                { image: "/images/carousel3.png", title: "Pronađi točno ono što ti treba" },
                { image: "/images/carousel4.png", title: "Najprivlačnije ponude" }
            ].map((item, index) => (
                <Box
                    key={`carousel-item-${index}`} // Ensure unique key
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: "400px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                    <Typography
                        variant="h3"
                        sx={{
                            ...titleStyle,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#F1E9DA",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            textAlign: "center",
                            zIndex: 2,
                        }}
                    >
                        {item.title}
                    </Typography>
                </Box>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;