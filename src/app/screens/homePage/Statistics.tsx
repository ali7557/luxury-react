import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  // Fixed path mapping: pointing directly to your /img folder
  const watchLogos = [
    { name: "rado", file: "rado.png" },
    { name: "swatch", file: "swatch.png" },
    { name: "omega", file: "omega.png" },
    { name: "zenith", file: "zenith.png" }
  ];

  return (
    <Box className="statistics-section-wrapper" sx={{ backgroundColor: "#14171a", py: 7 }}>
      <Container maxWidth="lg">
        
        {/* UPPER PANEL: Boxed Counter Display */}
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          className="luxury-counter-frame"
          sx={{ mb: 5, px: 4, py: 3 }}
        >
          <Stack className="static-box" alignItems="center">
            <Box className="static-num">12</Box>
            <Box className="static-text">Global Boutiques</Box>
          </Stack>
          
          <Divider height="45" width="1" bg="rgba(227, 192, 141, 0.25)"/>

          <Stack className="static-box" alignItems="center">
            <Box className="static-num">80+</Box>
            <Box className="static-text">Years Heritage</Box>
          </Stack>
          
          <Divider height="45" width="1" bg="rgba(227, 192, 141, 0.25)"/>
          
          <Stack className="static-box" alignItems="center">
            <Box className="static-num">50+</Box>
            <Box className="static-text">Masterpieces</Box>
          </Stack>
          
          <Divider height="45" width="1" bg="rgba(227, 192, 141, 0.25)"/>

          <Stack className="static-box" alignItems="center">
            <Box className="static-num">2,500+</Box>
            <Box className="static-text">Collectors</Box>
          </Stack>
        </Stack>

        {/* LOWER PANEL: Framed Brand Ribbon */}
        <Stack 
          direction="row" 
          justifyContent="center" 
          alignItems="center" 
          spacing={8}
          className="brand-ribbon-container"
          sx={{ pt: 4 }}
        >
         {watchLogos.map((logo, index) => (
  <Box 
    key={index}
    sx={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      width: "120px",
      /* NEW: Forces a fixed block for the logo area */
      height: "40px", 
      justifyContent: "center" 
    }}
  >
    <Box 
      component="img"
      src={`/img/${logo.file}`}
      alt={logo.name}
      sx={{
        /* FORCE EQUAL HEIGHT AND WIDTH */
        height: "100%", 
        width: "100%",
        objectFit: "contain",
        filter: "brightness(0) invert(0.8)",
        transition: "all 0.3s ease",
        "&:hover": { filter: "brightness(0) invert(1)", transform: "scale(1.05)" }
      }}
    />
    <Typography sx={{ mt: 1, fontSize: "8px", letterSpacing: "1px", color: "#e3c08d", textTransform: "uppercase" }}>
      Exhibition Details
    </Typography>
  </Box>
))}
         
        </Stack>

      </Container>
    </Box>
  );
}