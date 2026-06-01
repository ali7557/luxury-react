import React from "react";
import { Box, Button, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
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
    <div 
      className="home-navbar"
style={{
  // Lower opacity (0.3) keeps the watch image vivid
  backgroundImage: `linear-gradient(rgba(11, 11, 11, 0.3), rgba(11, 11, 11, 0.9)), url("/img/header-bg.jpg")`
}}
     
    >
      {/* Replaced rigid <Container> with a standard semantic <div> wrapper.
        This allows the inner navigation bar elements to dynamically scale across the layout grid.
      */}
      <div className="navbar-container-fluid">
        
        {/* TOP BRAND NAVIGATION LINE */}
        
      <Stack className="menu" direction="row" alignItems="center" justifyContent="flex-end">
     <img className="brand-logo" src="/icons/logo.png" alt="Logo"/>
  
  <Stack className="links" direction="row" alignItems="center" spacing={4}>
    <Box className="hover-line"><NavLink to="/">Home</NavLink></Box>
    <Box className="hover-line"><NavLink to="/products">Products</NavLink></Box>
    {authMember && <Box className="hover-line"><NavLink to="/orders">Orders</NavLink></Box>}
    {authMember && <Box className="hover-line"><NavLink to="/member-page">My Page</NavLink></Box>}
    <Box className="hover-line"><NavLink to="/help">Help</NavLink></Box>

    <Basket 
      cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} 
      onDelete={onDelete} onDeleteAll={onDeleteAll}
    />

    {!authMember ? (
      <Button 
        variant="outlined" 
        className="login-button" 
        onClick={() => setLoginOpen(true)}
      >
        Login
      </Button>
    ) : (
      <img
        className="user-avatar"
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
    
    {/* Menu remains unchanged */}
  </Stack>
</Stack>

        {/* HERO TEXT TITLES & ACTION SECTIONS */}
        <Stack className="header-frame">
          <Stack className="detail">
            <Box className="head-main-txt">In Pursuit of Perfection</Box>
            <Box className="wel-txt">Inspired by the Impossible</Box>
            <Box className="service-txt">Private Concierge & Horology Suite | Global Delivery</Box>
            
            <Box className="signup">
              {!authMember && (
                <Button variant="contained" className="signup-button" onClick={() => setSignupOpen(true)}>
                  Sign Up
                </Button>
              )}
            </Box>
          </Stack>
        </Stack>

      </div>
    </div>
  );
}