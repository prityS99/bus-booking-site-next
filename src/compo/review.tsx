"use client";

import React from "react";
import { Box, Container, Typography, Stack, Rating, Avatar, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


import review from "../../public/review/review.jpg";

const CUSTOMER_REVIEWS = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review: "RedBus made my inter-city travel so smooth! Easy booking, comfortable ride, and on-time arrival. Highly recommend for stress-free journeys.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rahul Kumar",
    location: "Delhi",
    rating: 4.5,
    review: "Great experience with RedBus. The bus was clean, and the staff was courteous. The only minor point was a slight delay, but overall excellent service.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Anjali Singh",
    location: "Bangalore",
    rating: 5,
    review: "Fantastic service! I booked a last-minute ticket and had no issues. The app is super user-friendly, and the bus tracking feature is a lifesaver.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Vikram Reddy",
    location: "Hyderabad",
    rating: 5,
    review: "I travel frequently for work and RedBus is my go-to. Always reliable, good selection of operators, and great customer support. Keep up the good work!",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    name: "Sneha Patel",
    location: "Ahmedabad",
    rating: 4,
    review: "Good experience, comfortable seats. Just wish there were more options for late-night buses on my route. But overall, a solid choice for bus travel.",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
  },
];

export default function Review() {
  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 0 },
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${review.src || 'https://images.unsplash.com/photo-1553531384-cc64ac80b931?q=80&w=2000'})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      <Container sx={{ maxWidth: "1200px !important", textAlign: "center" }}>
        <Typography 
          variant="h3" 
          fontWeight={800} 
          sx={{ mb: 2, color: "#D84E55", fontSize: { xs: "2.5rem", md: "3.5rem" } }}
        >
          What Our Customers Say
        </Typography>
        <Typography variant="h6" sx={{ mb: { xs: 6, md: 8 }, maxWidth: "800px", mx: "auto", opacity: 0.9 }}>
          Trusted by millions, we strive to make every journey a memorable one. Here's what they have to say.
        </Typography>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          style={{ paddingBottom: "50px" }} // Space for pagination
        >
          {CUSTOMER_REVIEWS.map((review, index) => (
            <SwiperSlide key={index}>
              <Paper 
                elevation={6} 
                sx={{ 
                  p: 4, 
                  borderRadius: "16px", 
                  bgcolor: "rgba(255, 255, 255, 0.95)", // Slightly transparent white
                  color: "#333", 
                  height: "auto", // Allow card height to adjust
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: { xs: "280px", md: "300px" } // Ensure minimum height for consistency
                }}
              >
                <Avatar src={review.avatar} sx={{ width: 80, height: 80, mb: 2, border: "3px solid #D84E55" }} />
                <Rating name="read-only" value={review.rating} precision={0.5} readOnly sx={{ mb: 1, color: "#FFD700" }} />
                <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>
                  "{review.review}"
                </Typography>
                <Stack spacing={0.5}>
                  <Typography variant="h6" fontWeight={700} color="#D84E55">
                    {review.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.location}
                  </Typography>
                </Stack>
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}