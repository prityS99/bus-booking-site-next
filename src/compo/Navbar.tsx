"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  Button,
  Drawer,
  IconButton,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import logo from "../../public/logo/logo.png";
import { AppDispatch, RootState } from "@/hooks/store";
import { logoutUser } from "@/hooks/slices/authThunks";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener for dynamic glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const role = user?.role;

  const navLinks = [
    { href: "/buses", label: "Bus Tickets" },
    { href: "/dashboard", label: "My Bookings" },
    { href: "/contactus", label: "Help" },
  ];

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          // Modern Glassmorphism
          background: scrolled 
            ? "rgba(255, 255, 255, 0.8)" 
            : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px) saturate(180%)",
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.04)" : "none",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Strict 1400px Container */}
        <Container sx={{ maxWidth: "1400px !important" }}>
          <Toolbar disableGutters sx={{ height: { xs: 70, lg: 85 } }}>
            
            {/* Brand Logo */}
            <Box component={Link} href="/" sx={{ display: "flex", alignItems: "center", mr: 5 }}>
              <Image 
                src={logo} 
                alt="Logo" 
                width={100} 
                height={80} 
                style={{ objectFit: "contain" }} 
              />
            </Box>

            {/* Desktop Navigation */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}
            >
              {navLinks.map((link) => (
                <NavItem
                  key={link.href}
                  href={link.href}
                  active={pathname === link.href}
                >
                  {link.label}
                </NavItem>
              ))}
            </Stack>

            {/* Right Side Buttons */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: { xs: "none", lg: "flex" } }}
            >
              {!isAuthenticated ? (
                <Button
                  component={Link}
                  href="/login"
                  variant="contained"
                  startIcon={<LoginIcon />}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    backgroundColor: "#D84E55", // RedBus Style Red
                    "&:hover": { backgroundColor: "#B23B41", boxShadow: "0 8px 20px rgba(216, 78, 85, 0.25)" },
                    boxShadow: "none",
                  }}
                >
                  LOGIN
                </Button>
              ) : (
                <>
                  {role === "admin" && (
                    <Button
                      component={Link}
                      href="/admin"
                      variant="text"
                      sx={{ color: "#374151", fontWeight: 600, textTransform: "none" }}
                    >
                      Admin Panel
                    </Button>
                  )}
                  <Button
                    onClick={handleLogout}
                    variant="outlined"
                    startIcon={<LogoutIcon />}
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: 600,
                      borderColor: "#D1D5DB",
                      color: "#374151",
                      "&:hover": { borderColor: "#D84E55", color: "#D84E55" },
                    }}
                  >
                    LOGOUT
                  </Button>
                </>
              )}
            </Stack>

            {/* Mobile Hamburger */}
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ display: { xs: "flex", lg: "none" }, ml: "auto", color: "#D84E55" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Spacing to push content below fixed navbar */}
      <Toolbar sx={{ height: { xs: 70, lg: 85 } }} />


      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 280 } }}
      >
        {/* Header Section with Logo and Close Icon */}
        <Box 
          sx={{ 
            p: 2, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between" 
          }}
        >
          <Box sx={{ pl: 1 }}>
            <Image src={logo} alt="Logo" width={90} height={35} style={{ objectFit: "contain" }} />
          </Box>
          
          <IconButton onClick={() => setOpen(false)} sx={{ color: "#374151" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Stack spacing={1} sx={{ p: 2 }}>
          {navLinks.map((link) => (
            <Box
              key={link.href}
              component={Link}
              href={link.href}
              onClick={() => setOpen(false)}
              sx={{
                p: 2,
                textDecoration: "none",
                borderRadius: "8px",
                color: pathname === link.href ? "#D84E55" : "#374151",
                bgcolor: pathname === link.href ? "rgba(216, 78, 85, 0.05)" : "transparent",
                fontWeight: 600,
                display: "block" // Ensure it takes full width for better tap targets
              }}
            >
              {link.label}
            </Box>
          ))}
        </Stack>
        
        {/* Optional: Add Logout/Login buttons in drawer too if needed */}
        <Box sx={{ mt: 'auto', p: 2 }}>
           {!isAuthenticated ? (
             <Button 
               fullWidth 
               variant="contained" 
               component={Link} 
               href="/login"
               sx={{ bgcolor: "#D84E55", borderRadius: "10px" }}
             >
               LOGIN
             </Button>
           ) : (
             <Button 
               fullWidth 
               variant="outlined" 
               onClick={handleLogout}
               sx={{ borderRadius: "10px", borderColor: "#D1D5DB", color: "#374151" }}
             >
               LOGOUT
             </Button>
           )}
        </Box>
      </Drawer>
    </>
  );
}

/* --- Nav Item Sub-Component --- */
function NavItem({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        px: 2.5,
        py: 1,
        textDecoration: "none",
        fontWeight: active ? 700 : 500,
        color: active ? "#D84E55" : "#374151",
        fontSize: "0.95rem",
        borderRadius: "8px",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.03)",
          color: "#D84E55",
        },
      }}
    >
      {children}
    </Box>
  );
}