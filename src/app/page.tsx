"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import {
  CircularProgress,
  Typography,
  Button,
  Box,
  List,
  ListItem,
} from "@mui/material";

const Home: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="grey.100"
    >
      <Typography variant="h1" component="h1" gutterBottom color="primary">
        Pawfect Grooming Services
      </Typography>

      {user ? (
        <>
          <Typography
            variant="h6"
            color="textSecondary"
            align="center"
            maxWidth="md"
            gutterBottom
          >
            Welcome back, {user.fullName}! What would you like to do today?
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/appointments/me"
            >
              My Appointments
            </Button>
            <Button
              variant="contained"
              color="success"
              component={Link}
              href="/appointments/new"
            >
              Book New Appointment
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              href="/appointments"
            >
              View all Appointments
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography
            variant="h6"
            color="textSecondary"
            align="center"
            maxWidth="md"
            gutterBottom
          >
            Professional dog grooming services tailored to your furry
            friend&apos;s needs. Book appointments, track grooming history, and
            keep your pet looking their best.
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <List>
              <ListItem>✓ Full-service grooming and bathing</ListItem>
              <ListItem>✓ Nail trimming and ear cleaning</ListItem>
              <ListItem>✓ Breed-specific styling</ListItem>
              <ListItem>✓ Online appointment scheduling</ListItem>
            </List>
          </Box>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/auth/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="success"
              component={Link}
              href="/auth/register"
            >
              Book Your First Appointment
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;
