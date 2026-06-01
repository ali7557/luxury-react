import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #0b0e11; /* Dark Luxury Background */
  border-top: 1px solid rgba(212, 175, 55, 0.1);
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "94px" }}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            <Box>
              {/* Replace with your new Watch Logo */}
              <img width={"120px"} src={"/icons/logo.png"} alt="Luxury Logo" />
            </Box>
            <Box className={"foot-desc-txt"}>
              Defining precision and elegance since 2001. Our curated collection 
              represents the pinnacle of horological artistry and timeless 
              craftsmanship for the modern collector.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} style={{ filter: 'invert(1)' }} />
              <img src={"/icons/twitter.svg"} style={{ filter: 'invert(1)' }} />
              <img src={"/icons/instagram.svg"} style={{ filter: 'invert(1)' }} />
              <img src={"/icons/youtube.svg"} style={{ filter: 'invert(1)' }} />
            </Box>
          </Stack>
          
          <Stack sx={{ ml: "288px" }} flexDirection={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Collection</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Watch Gallery</Link>
                  {authMember && <Link to="/orders">My Collection</Link>}
                  <Link to="/help">Assistance</Link>
                </Box>
              </Box>
            </Stack>
            
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Boutique</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>Haeundae, Busan, KR</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+82 51 749 5555</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>concierge@luxurywatch.com</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>H.</span>
                    <div>By Appointment Only</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        
        <Stack
          style={{ border: "1px solid #d4af37", width: "100%", opacity: "0.1" }}
          sx={{ mt: "80px" }}
        ></Stack>
        
        <Stack className={"copyright-txt"}>
          © {new Date().getFullYear()} Luxury Watch Gallery. All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}