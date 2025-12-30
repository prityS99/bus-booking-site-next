"use client";

import React from "react";
import { Box, Container, Typography, Paper, Button, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const OFFERS = [
  {
    id: 1,
    title: "Save up to ₹250 on bus tickets",
    code: "FIRST",
    validTill: "31 Dec",
    color: "#D84E55",
    bg: "rgba(216, 78, 85, 0.05)",
  },
  {
    id: 2,
    title: "Get 10% Cashback on Amazon Pay",
    code: "APAY10",
    validTill: "15 Jan",
    color: "#FF9900",
    bg: "rgba(255, 153, 0, 0.05)",
  },
  {
    id: 3,
    title: "Flat ₹100 Off for New Users",
    code: "NEW100",
    validTill: "20 Jan",
    color: "#10B981",
    bg: "rgba(16, 185, 129, 0.05)",
  },
  {
    id: 4,
    title: "Free Cancellation on Luxury Buses",
    code: "FREECANCEL",
    validTill: "05 Jan",
    color: "#3B82F6",
    bg: "rgba(59, 130, 246, 0.05)",
  },
];

export default function Offers() {
  return (
    <Box sx={{ py: 8, bgcolor: "#fff" }}>
      <Container sx={{ maxWidth: "1400px !important" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1F2937" }}>
              Trending Offers
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Grab the best deals for your next journey
            </Typography>
          </Box>
          <Button sx={{ color: "#D84E55", fontWeight: 700, textTransform: "none" }}>
            View All Offers
          </Button>
        </Stack>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          style={{ paddingBottom: "40px" }}
        >
          {OFFERS.map((offer) => (
            <SwiperSlide key={offer.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "180px",
                  borderRadius: "16px",
                  background: offer.bg,
                  border: `1px dashed ${offer.color}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1F2937", mb: 1 }}>
                    {offer.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#6B7280" }}>
                    Valid till: {offer.validTill}
                  </Typography>
                </Box>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: "6px",
                      bgcolor: "#fff",
                      border: "1px solid #E5E7EB",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      color: offer.color,
                    }}
                  >
                    CODE: {offer.code}
                  </Box>
                  <Button
                    size="small"
                    sx={{ color: offer.color, fontWeight: 700, textTransform: "none" }}
                  >
                    Copy
                  </Button>
                </Stack>
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}