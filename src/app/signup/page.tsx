"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Stack, 
  IconButton, 
  InputAdornment, 
  Avatar, 
  Badge, 
  CircularProgress,
  Paper
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  PhotoCamera, 
  PersonOutline, 
  EmailOutlined, 
  PhoneIphoneOutlined, 
  LockOutlined,
  DirectionsBus
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/hooks/store";
import { signupUser } from "@/hooks/slices/authThunks";
import { toast } from "sonner";

// Validation Schema
const schema = yup.object({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  mobile: yup.string().min(10, "Mobile must be at least 10 digits").required("Mobile number is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function RedBusSignup() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: reduxError } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      setProfileImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: FormData) => {
    const resultAction = await dispatch(signupUser({ ...data, profileImage }));

    if (signupUser.fulfilled.match(resultAction)) {
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } else {
      toast.error(resultAction.payload as string || "Signup failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", bgcolor: "#F7F9FB" }}>
      {/* Container to center the card */}
      <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            display: "flex", 
            width: "100%", 
            borderRadius: "24px", 
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)"
          }}
        >
          {/* Left Section: Marketing (RedBus Theme) */}
          <Box 
            sx={{ 
              flex: 1, 
              display: { xs: "none", md: "flex" }, 
              bgcolor: "#D84E55", 
              color: "#fff",
              p: 6,
              flexDirection: "column",
              justifyContent: "center",
              backgroundImage: `linear-gradient(rgba(216, 78, 85, 0.9), rgba(216, 78, 85, 0.9)), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000')`,
              backgroundSize: "cover"
            }}
          >
            <DirectionsBus sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h3" fontWeight={800} gutterBottom>
              Join the World's Largest Bus Network
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
              Manage your bookings, get instant refunds, and enjoy exclusive travel offers.
            </Typography>
          </Box>

          {/* Right Section: Signup Form */}
          <Box sx={{ flex: 1, p: { xs: 4, md: 8 }, bgcolor: "#fff" }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="h4" fontWeight={800} color="#1F2937" gutterBottom>
                Create Account
              </Typography>
              <Typography variant="body2" color="#6B7280">
                Already have an account?{" "}
                <Typography 
                  component="span" 
                  onClick={() => router.push("/login")}
                  sx={{ color: "#D84E55", cursor: "pointer", fontWeight: 700 }}
                >
                  Sign in
                </Typography>
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                {/* Profile Image Picker */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <IconButton 
                        component="label" 
                        sx={{ bgcolor: "#D84E55", color: "#fff", "&:hover": { bgcolor: "#B23B41" }, width: 32, height: 32 }}
                      >
                        <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                        <PhotoCamera sx={{ fontSize: 18 }} />
                      </IconButton>
                    }
                  >
                    <Avatar 
                      src={imagePreviewUrl || ""} 
                      sx={{ width: 100, height: 100, border: "4px solid #F7F9FB", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
                    >
                      <PersonOutline sx={{ fontSize: 50 }} />
                    </Avatar>
                  </Badge>
                </Box>

                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="John Doe"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PersonOutline /></InputAdornment>,
                  }}
                  sx={inputStyles}
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  placeholder="john@example.com"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><EmailOutlined /></InputAdornment>,
                  }}
                  sx={inputStyles}
                />

                <TextField
                  fullWidth
                  label="Mobile Number"
                  placeholder="9876543210"
                  {...register("mobile")}
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PhoneIphoneOutlined /></InputAdornment>,
                  }}
                  sx={inputStyles}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><LockOutlined /></InputAdornment>,
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
                  fullWidth
                  type="submit"
                  disabled={loading}
                  variant="contained"
                  sx={{
                    py: 1.8,
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    bgcolor: "#D84E55",
                    boxShadow: "0 8px 25px rgba(216, 78, 85, 0.3)",
                    "&:hover": { bgcolor: "#B23B41" }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "CREATE ACCOUNT"}
                </Button>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

// Custom styles for TextFields to match RedBus aesthetic
const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "&.Mui-focused fieldset": { borderColor: "#D84E55" }
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#D84E55" }
};