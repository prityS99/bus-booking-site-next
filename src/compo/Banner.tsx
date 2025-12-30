"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  InputAdornment,
  Divider,
  IconButton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Icons
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

// Swiper Styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const BANNER_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000",
    title: "India's No. 1 Online Bus Ticket Booking Site",
    sub: "Trusted by over 25 million happy customers globally."
  },
  {
    url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2000",
    title: "Travel Safely with Top Rated Operators",
    sub: "Rigorous safety checks for every journey."
  },
  {
    url: "https://images.unsplash.com/photo-1562620644-64049873d699?q=80&w=2000",
    title: "Flat 20% Off on your First Booking",
    sub: "Use code: FIRST20 and save big on your first trip."
  },
];

export default function Banner() {
  return (
    <Box sx={{ position: "relative", mb: { xs: 25, md: 15 } }}>
      <Box sx={{ height: { xs: "500px", md: "550px" }, width: "100%", position: "relative" }}>
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          style={{ height: "100%", width: "100%" }}
        >
          {BANNER_IMAGES.map((item, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${item.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  pb: 10
                }}
              >
                <Container sx={{ maxWidth: "1200px !important" }}>
                  <Stack spacing={2}>
                    <Typography variant="h2" sx={{ color: "#fff", fontWeight: 900, maxWidth: "700px", fontSize: { xs: "2rem", md: "3.5rem" }, lineHeight: 1.1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 400, maxWidth: "500px" }}>
                      {item.sub}
                    </Typography>
                  </Stack>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* FLOATING SEARCH BAR */}
      <Container
        sx={{
          maxWidth: "1200px !important",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: { xs: "-180px", md: "-50px" },
          zIndex: 10,
        }}
      >
        <Paper elevation={20} sx={{ p: { xs: 2, md: 0.5 }, borderRadius: "24px", background: "#fff", overflow: "hidden" }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, my: 2 }} />}
            alignItems="center"
          >
            <SearchField label="From" placeholder="Source City" icon={<DirectionsBusIcon />} />
            
            <IconButton sx={{ bgcolor: "#F9FAFB", border: "1px solid #E5E7EB", mx: -1, zIndex: 2, "&:hover": { bgcolor: "#f3f4f6" } }}>
              <SyncAltIcon sx={{ color: "#D84E55", fontSize: "1.2rem" }} />
            </IconButton>

            <SearchField label="To" placeholder="Destination City" icon={<LocationOnIcon />} />
            <SearchField label="Date" type="date" placeholder="Travel Date" icon={<CalendarMonthIcon />} />

            <Button
              variant="contained"
              disableElevation
              sx={{
                height: { xs: "60px", md: "90px" },
                minWidth: "220px",
                fontSize: "1.2rem",
                fontWeight: 800,
                textTransform: "none",
                bgcolor: "#D84E55",
                borderRadius: { xs: "12px", md: "0 20px 20px 0" },
                "&:hover": { bgcolor: "#B23B41" },
              }}
            >
              SEARCH BUSES
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

function SearchField({ label, placeholder, icon, type = "text" }: any) {
  return (
    <Box sx={{ flex: 1, width: "100%", p: { xs: 1, md: 2.5 }, pl: { md: 4 } }}>
      <Typography variant="caption" sx={{ color: "#9CA3AF", fontWeight: 700, mb: 0.5, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        type={type}
        placeholder={placeholder}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          startAdornment: <InputAdornment position="start" sx={{ color: "#6B7280" }}>{icon}</InputAdornment>,
          sx: { fontSize: "1.1rem", fontWeight: 600, color: "#1F2937" },
        }}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
}