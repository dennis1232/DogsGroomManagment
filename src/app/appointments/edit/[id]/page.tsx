"use client";

import { Box, Container, Paper, Typography } from "@mui/material";
import AppointmentForm from "@/app/components/AppointmentForm";
import { useAuth } from "@/context/authContext";
import Loading from "@/app/components/Loading";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useEffect, useState } from "react";
import { Appointment } from "@/models/Appointment";
import { getAppointment } from "@/app/services/appointment";
import { useParams } from "next/navigation";

export default function EditAppointment() {
  const { user } = useAuth();
  const params = useParams();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const appointmentData = await getAppointment(params.id as string);
        setAppointment(appointmentData);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAppointment();
    }
  }, [params.id]);

  if (!user || loading) {
    return <Loading />;
  }

  if (!appointment) {
    return <Typography>Appointment not found</Typography>;
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
          Edit Appointment
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
          Update your pet&apos;s grooming appointment details below.
        </Typography>

        <AppointmentForm user={user} appointment={appointment} />
      </Paper>
    </Container>
  );
}
