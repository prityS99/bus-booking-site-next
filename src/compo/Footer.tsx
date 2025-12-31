"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SecurityIcon from "@mui/icons-material/Security";
import logo from "../../public/logo/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Top Bus Routes",
      links: ["Hyderabad to Bangalore", "Pune to Mumbai", "Delhi to Jaipur", "Coimbatore to Chennai"],
    },
    {
      title: "About RedBus",
      links: ["About us", "Investor Relations", "Contact us", "Mobile version", "RedBus on Mobile"],
    },
    {
      title: "Info",
      links: ["T&C", "Privacy Policy", "Cookie Policy", "FAQ", "Blog"],
    },
    {
      title: "Global Sites",
      links: ["India", "Singapore", "Malaysia", "Indonesia", "Peru"],
    },
  ];

  return (
    <Box component="footer" sx={{ bgcolor: "#F7F9FB", pt: 10, pb: 4, mt: 10 }}>
      {/* Set container to 1200px as per your previous preference */}
      <Container sx={{ maxWidth: "1200px !important" }}>
        
        {/* --- 1. Modern Newsletter Wrapper --- */}
        <Box 
          sx={{ 
            bgcolor: "#fff", 
            borderRadius: "24px", 
            p: { xs: 4, md: 6 }, 
            mb: 10,
            boxShadow: "0 10px 50px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#1F2937", mb: 1 }}>
              Get the best deals first! 🚌
            </Typography>
            <Typography variant="body1" sx={{ color: "#6B7280" }}>
              Join 1 million+ travelers. We’ll send you the best routes and exclusive discounts.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: "100%", maxWidth: "500px" }}>
            <TextField
              fullWidth
              placeholder="Your email address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ color: "#9CA3AF" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  bgcolor: "#F9FAFB",
                  "& fieldset": { borderColor: "#E5E7EB" },
                }
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#D84E55",
                px: 4,
                py: 2,
                borderRadius: "14px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1rem",
                "&:hover": { bgcolor: "#B23B41" },
                boxShadow: "0 8px 25px rgba(216, 78, 85, 0.3)"
              }}
            >
              Subscribe
            </Button>
          </Stack>
        </Box>

        {/* --- 2. Main Navigation Grid --- */}
        {/* In MUI v6, container prop is boolean and item prop is removed. Use 'size' */}
        <Grid container spacing={6} sx={{ mb: 6 }}>
          {/* Brand Column */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={3}>
              <Box>
                <Image src={logo} alt="Logo" width={180} height={120} style={{ objectFit: 'contain' }} />
              </Box>
              <Typography variant="body2" sx={{ color: "#6B7280", lineHeight: 1.8, maxWidth: "320px" }}>
                RedBus is the world's largest online bus ticket booking service trusted by over 25 million happy customers globally. We offer the best prices and widest choices.
              </Typography>
              <Stack direction="row" spacing={1.5}>
                {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, i) => (
                  <IconButton key={i} size="small" sx={{ bgcolor: "#fff", color: "#4B5563", "&:hover": { color: "#D84E55", bgcolor: "#fff" }, border: "1px solid #E5E7EB" }}>
                    <Icon fontSize="small" />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Link Columns */}
          {footerLinks.map((section) => (
            <Grid size={{ xs: 6, sm: 3, lg: 2 }} key={section.title}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1F2937", mb: 3 }}>
                {section.title}
              </Typography>
              <Stack spacing={1.5}>
                {section.links.map((link) => (
                  <Typography
                    key={link}
                    component={Link}
                    href="#"
                    variant="body2"
                    sx={{
                      color: "#4B5563",
                      textDecoration: "none",
                      transition: "0.2s",
                      display: "block",
                      "&:hover": { color: "#D84E55", transform: "translateX(4px)" },
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 4, borderColor: "#E5E7EB" }} />

        {/* --- 3. Bottom Bar & Trust --- */}
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", md: "row" }, 
            justifyContent: "space-between", 
            alignItems: "center", 
            gap: 2 
          }}
        >
          <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
            © {currentYear} RedBus India Pvt Ltd. All rights reserved.
          </Typography>

          <Stack direction="row" alignItems="center" spacing={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SecurityIcon sx={{ color: "#10B981", fontSize: 18 }} />
              <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 600 }}>
                Secure SSL Encryption
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Typography component={Link} href="#" sx={{ color: "#9CA3AF", textDecoration: "none", fontSize: "0.75rem", "&:hover": { color: "#4B5563" } }}>Privacy</Typography>
              <Typography component={Link} href="#" sx={{ color: "#9CA3AF", textDecoration: "none", fontSize: "0.75rem", "&:hover": { color: "#4B5563" } }}>Terms</Typography>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}