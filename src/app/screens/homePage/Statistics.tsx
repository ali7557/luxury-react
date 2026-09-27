import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

export default function Statistics() {
  // Fixed path mapping: pointing directly to your /img folder
  const watchLogos = [
    { name: "rado", file: "rado.png" },
    { name: "swatch", file: "swatch.png" },
    { name: "omega", file: "omega.png" },
    { name: "zenith", file: "zenith.png" }
  ];

  return (
    <Box className="statistics-section-wrapper">
      <Box className="statistics-row-section">
        <Container maxWidth={false} className="statistics-container">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="luxury-counter-frame"
          >
            <Stack className="static-box" alignItems="center">
              <Box className="static-num">12</Box>
              <Box className="static-text">Global Boutiques</Box>
            </Stack>
            <Stack className="static-box" alignItems="center">
              <Box className="static-num">80+</Box>
              <Box className="static-text">Years Heritage</Box>
            </Stack>
            <Stack className="static-box" alignItems="center">
              <Box className="static-num">50+</Box>
              <Box className="static-text">Masterpieces</Box>
            </Stack>
            <Stack className="static-box" alignItems="center">
              <Box className="static-num">2,500+</Box>
              <Box className="static-text">Collectors</Box>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box className="brands-section">
        <Container maxWidth={false} className="statistics-container">
          <Typography component="h2" className="brand-ribbon-heading">
            Featured Brands
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            className="brand-ribbon-container"
          >
            {watchLogos.map((logo, index) => (
              <Box key={index} className="brand-ribbon-item">
                <Box
                  component="img"
                  src={`/img/${logo.file}`}
                  alt={logo.name}
                  className="brand-ribbon-logo"
                />
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
