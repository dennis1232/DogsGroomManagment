"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PetsRounded } from "@mui/icons-material";

const StyledLink = styled(Link)(({ active }: { active?: boolean }) => ({
  borderRadius: 8,
  textTransform: "none",
  padding: "8px 20px",
  fontWeight: active ? 600 : 400,
  fontSize: "0.95rem",
  transition: "all 0.2s ease",
  position: "relative",
  textDecoration: "none",
  display: "inline-block",
  color: active ? "#1976d2" : "#666",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: active ? "translateX(-50%)" : "translateX(-50%) scaleX(0)",
    height: "2px",
    width: "70%",
    backgroundColor: "#1976d2",
    transition: "transform 0.2s ease",
    borderRadius: "1px",
  },
  "&:hover": {
    transform: "translateY(-1px)",
    backgroundColor: "rgba(25, 118, 210, 0.04)",
    color: "#1976d2",
    "&:after": {
      transform: "translateX(-50%) scaleX(1)",
    },
  },
  "&:active": {
    transform: "translateY(0)",
  },
}));

const Navbar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#fff",
        borderBottom: "1px solid #eee",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": { opacity: 0.9 },
                }}
              >
                <PetsRounded
                  sx={{
                    fontSize: 35,
                    color: "#0066FF",
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight="700"
                  sx={{
                    color: "#0066FF",
                  }}
                >
                  Dog Grooming
                </Typography>
              </Box>
            </Link>

            {user && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <StyledLink
                  color="primary"
                  href="/appointments/new"
                  active={pathname === "/appointments/new"}
                >
                  Book Appointment
                </StyledLink>
                <StyledLink
                  color="primary"
                  href="/appointments"
                  active={pathname === "/appointments"}
                >
                  All Appointments
                </StyledLink>
                <StyledLink
                  color="primary"
                  href="/appointments/me"
                  active={pathname === "/appointments/me"}
                >
                  My Appointments
                </StyledLink>
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {user ? (
              <>
                <Button
                  onClick={logout}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#F03E3E",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#E03131",
                    },
                  }}
                >
                  Logout
                </Button>
                <Typography
                  sx={{
                    color: "#666",
                    fontSize: "0.95rem",
                  }}
                >
                  Hi,{" "}
                  <span style={{ color: "#0066FF", fontWeight: 600 }}>
                    {user.fullName}
                  </span>
                </Typography>
              </>
            ) : (
              <Link href="/auth/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#0066FF",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#0052CC",
                    },
                  }}
                >
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
