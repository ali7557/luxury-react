import React from "react";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { useGlobals } from "../../hooks/useGlobal"; 
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

export default function HomeNavbar(props: any) {
  const { 
    cartItems, onAdd, onRemove, onDelete, onDeleteAll, 
    setSignupOpen, setLoginOpen, handleLogoutClick,
    anchorEl, handleCloseLogout, handleLogoutRequest,
  } = props;

  const { authMember } = useGlobals();

  return (
    <Box className="home-navbar">
      <Container maxWidth={false} disableGutters className="home-nav-container">
        
        {/* TOP BRAND NAVIGATION LINE */}
        
      <Stack className="home-nav-menu" direction="row" alignItems="center">
     <img className="home-nav-logo" src="/icons/logo.png" alt="Logo"/>
  
  <Stack className="home-nav-center" direction="row" alignItems="center">
    <Box className="home-nav-link home-nav-link-active"><NavLink to="/">Home</NavLink></Box>
    <Box className="home-nav-link"><NavLink to="/products">Products</NavLink></Box>
    {authMember && <Box className="home-nav-link"><NavLink to="/orders">Orders</NavLink></Box>}
    {authMember && <Box className="home-nav-link"><NavLink to="/member-page">My Page</NavLink></Box>}
    <Box className="home-nav-link"><NavLink to="/help">Help</NavLink></Box>
  </Stack>

  <Stack className="home-nav-actions" direction="row" alignItems="center">
    <Box className="home-nav-cart">
      <Basket
        cartItems={cartItems} onAdd={onAdd} onRemove={onRemove}
        onDelete={onDelete} onDeleteAll={onDeleteAll}
      />
    </Box>

    {!authMember ? (
      <Button 
        variant="outlined" 
        className="home-nav-login"
        onClick={() => setLoginOpen(true)}
      >
        Login
      </Button>
    ) : (
      <img
        className="home-nav-avatar"
        src={authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg"}
        onClick={handleLogoutClick}
        alt="user profile"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          cursor: "pointer",
          border: "1px solid rgba(227, 192, 141, 0.35)",
          objectFit: "cover"
        }}
      />
    )}
  </Stack>

    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={Boolean(anchorEl)}
      onClose={handleCloseLogout}
      onClick={handleCloseLogout}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleLogoutRequest}>
        <ListItemIcon>
          <Logout fontSize="small" style={{ color: "blue" }} />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
</Stack>
      </Container>
      <Box className="hero-shell">
        <Box className="hero-media">
          <Box component="img" className="hero-watch" src="/img/watch.jpg" alt="Luxury watches" />
        </Box>
        <Container maxWidth={false} disableGutters className="hero-content-container">
          <Box className="hero-layout">
          <Stack className="hero-copy" spacing={0}>
            <Typography component="h1" className="hero-headline">
              IN PURSUIT OF<br />PERFECTION
            </Typography>
            <Typography component="p" className="hero-subtitle">Inspired by the Impossible</Typography>
            <Typography component="p" className="hero-service">PRIVATE CONCIERGE &amp; HOROLOGY SUITE | GLOBAL DELIVERY</Typography>

            <Box className="hero-actions">
              {!authMember && (
                <Button variant="contained" className="signup-button" onClick={() => setSignupOpen(true)}>
                  Sign Up →
                </Button>
              )}
            </Box>
          </Stack>
        </Box>
        </Container>
      </Box>
    </Box>
  );
}
