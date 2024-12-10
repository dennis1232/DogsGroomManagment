"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import { useAuth } from "@/context/authContext";
import {
  getCustomerAppointments,
  cancelAppointment,
} from "@/app/services/appointment";
import useToast from "@/hooks/useToast";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PetsIcon from "@mui/icons-material/Pets";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StraightenIcon from "@mui/icons-material/Straighten";
import { Appointment } from "@/models/Appointment";
import Loading from "@/app/components/Loading";
import AppointmentModal from "@/app/components/AppointmentModal";
import { useRouter } from "next/navigation";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();
  const router = useRouter();
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAppointments = useCallback(async () => {
    try {
      const data = await getCustomerAppointments();
      setAppointments(data);
    } catch {
      showError("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    if (user && loading) {
      fetchAppointments();
    }
  }, [fetchAppointments, loading, user]);

  const handleEdit = (appointment: Appointment) => {
    router.push(`/appointments/${appointment.id}`);
  };

  const handleDelete = async (appointmentId: number) => {
    try {
      await cancelAppointment(appointmentId);
      showSuccess("Appointment cancelled successfully");
      fetchAppointments();
    } catch {
      showError("Failed to cancel appointment");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!appointments.length) {
    return (
      <Container>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            textAlign: "center",
            gap: 2,
            p: 4,
            mt: 4,
            borderRadius: 2,
            background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
          }}
        >
          <PetsIcon
            sx={{
              fontSize: 80,
              color: "primary.main",
              transform: "rotate(15deg)",
            }}
          />
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            fontWeight="bold"
          >
            No Puppy Appointments Yet!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Time to pamper your furry friend with a grooming session!
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <PetsIcon
          sx={{
            fontSize: 40,
            color: "primary.main",
            transform: "rotate(15deg)",
          }}
        />
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          color="primary.main"
        >
          Puppy Spa Appointments
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {appointments.map((appointment) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={appointment.id}
            sx={{ cursor: "pointer" }}
          >
            <Card
              onClick={() => {
                setSelectedAppointment(appointment);
                setIsModalOpen(true);
              }}
              elevation={3}
              sx={{
                height: "100%",
                transition: "all 0.3s ease",
                borderRadius: 4,
                position: "relative",
                overflow: "visible",
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                  "& .paw-print": {
                    transform: "rotate(15deg) scale(1.1)",
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -15,
                  right: -15,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "primary.main",
                  opacity: 0.1,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  className="paw-print"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                    transition: "transform 0.3s ease",
                  }}
                >
                  <PetsIcon
                    sx={{
                      color: "primary.main",
                      fontSize: 32,
                      filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
                    }}
                  />
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: "#2c3e50" }}
                  >
                    {appointment.petName}
                  </Typography>
                </Box>

                <Divider
                  sx={{
                    my: 2,
                    background:
                      "linear-gradient(90deg, transparent, #e0e0e0, transparent)",
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      background: "rgba(255,255,255,0.7)",
                      p: 1,
                      borderRadius: 2,
                    }}
                  >
                    <CalendarTodayIcon sx={{ color: "primary.light" }} />
                    <Typography sx={{ color: "#34495e", fontWeight: 500 }}>
                      {new Date(
                        appointment.appointmentTime
                      ).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      background: "rgba(255,255,255,0.7)",
                      p: 1,
                      borderRadius: 2,
                    }}
                  >
                    <AccessTimeIcon sx={{ color: "primary.light" }} />
                    <Typography sx={{ color: "#34495e", fontWeight: 500 }}>
                      {new Date(appointment.appointmentTime).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      background: "rgba(255,255,255,0.7)",
                      p: 1,
                      borderRadius: 2,
                    }}
                  >
                    <StraightenIcon sx={{ color: "primary.light" }} />
                    <Typography sx={{ color: "#34495e", fontWeight: 500 }}>
                      {appointment.groomingDuration} min spa session
                    </Typography>
                  </Box>

                  <Chip
                    label={appointment.petSize}
                    color="primary"
                    sx={{
                      alignSelf: "flex-start",
                      mt: 1,
                      borderRadius: "16px",
                      fontWeight: 600,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedAppointment && (
        <AppointmentModal
          open={isModalOpen}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={() => setIsModalOpen(false)}
          appointment={selectedAppointment}
        />
      )}
    </Container>
  );
};

export default MyAppointments;
