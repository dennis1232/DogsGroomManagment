"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { Appointment } from "@/models/Appointment";
import { cancelAppointment, getAppointments } from "../services/appointment";
import AppointmentsTable from "../components/AppointmentsTable";
import Loading from "../components/Loading";
import useToast from "@/hooks/useToast";
import { ToastMessages } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface LoadingStates {
  page: boolean;
  delete: Record<number, boolean>;
  edit: Record<number, boolean>;
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { showSuccess, showError } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<LoadingStates>({
    page: true,
    delete: {},
    edit: {},
  });

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, page: true }));
      const data = await getAppointments();
      console.log(data);
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading((prev) => ({ ...prev, page: false }));
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleEdit = (id: number) => {
    router.push(`/appointments/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      await cancelAppointment(id);
      showSuccess(ToastMessages.appointmentDeleted);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      showError(ToastMessages.appointmentDeletionFailed);
    }
  };

  if (loading.page) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <CalendarTodayIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          color="primary.main"
        >
          All Appointments
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ width: "100%" }}>
        <AppointmentsTable
          appointments={appointments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>
    </Container>
  );
};

export default AppointmentsPage;
