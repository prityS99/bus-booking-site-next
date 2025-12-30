"use client";

import React, { useState } from "react";
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Stack, 
  InputAdornment, 
  IconButton, 
  CircularProgress 
} from "@mui/material";
import { 
  MailOutline, 
  LockOutlined, 
  Visibility, 
  VisibilityOff, 
  LoginOutlined 
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/hooks/store";
import { loginUser } from "@/hooks/slices/authThunks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Login Successful");
      router.push(result.payload.role === "admin" ? "/admin" : "/");
    } else {
      toast.error(result.payload as string || "Login failed");
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: "90vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
        px: 2 
      }}
    >
      {/* Strict 1200px Container */}
      <Container sx={{ maxWidth: "1200px !important", display: "flex", justifyContent: "center" }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 4, md: 6 }, 
            width: "100%",
            maxWidth: "500px",
            borderRadius: "28px", 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            bgcolor: "#fff"
          }}
        >
          <Box sx={{ mb: 5 }}>
            {/* Color updated to #D84E55 to match Logo/Brand */}
            <Typography variant="h3" fontWeight={900} sx={{ color: "#D84E55", mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
              Login to manage your tickets and profile
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="email"
                label="Email Address"
                placeholder="you@example.com"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutline sx={{ color: "#9CA3AF" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
              />

              <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: "#9CA3AF" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                size="large"
                startIcon={!loading && <LoginOutlined />}
                sx={{
                  py: 1.8,
                  borderRadius: "14px",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  bgcolor: "#D84E55", // RedBus Brand Red
                  boxShadow: "0 10px 20px rgba(216, 78, 85, 0.2)",
                  "&:hover": { 
                    bgcolor: "#b23b41",
                    boxShadow: "0 12px 25px rgba(216, 78, 85, 0.3)" 
                  },
                }}
              >
                {loading ? <CircularProgress size={26} color="inherit" /> : "LOG IN"}
              </Button>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Don't have an account?{" "}
                  <Typography 
                    component="span" 
                    onClick={() => router.push("/signup")}
                    sx={{ 
                      color: "#D84E55", 
                      fontWeight: 700, 
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" } 
                    }}
                  >
                    Sign Up
                  </Typography>
                </Typography>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: "#F9FAFB",
    "& fieldset": { borderColor: "#E5E7EB" },
    "&:hover fieldset": { borderColor: "#D84E55" },
    "&.Mui-focused fieldset": { borderColor: "#D84E55" },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#D84E55"
  }
};