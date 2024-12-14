"use client";

import { Box, Container, Paper, Typography } from "@mui/material";
import AppointmentForm from "@/app/components/AppointmentForm";
import { useAuth } from "@/context/authContext";
import Loading from "@/app/components/Loading";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function NewAppointment() {
  const { user } = useAuth();

  if (!user) {
    return <Loading />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <CalendarTodayIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          color="primary.main"
        >
          Book New Appointment
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
        }}
      >
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4, fontWeight: "normal" }}
        >
          Please fill in the details below to schedule your pet&apos;s grooming
          appointment.
        </Typography>

        <AppointmentForm user={user} appointment={undefined} />
      </Paper>
    </Container>
  );
}
