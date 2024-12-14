import React, { useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarTodayIcon,
  Pets as PetsIcon,
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  Straighten as StraightenIcon,
} from "@mui/icons-material";
import { Appointment } from "@/models/Appointment";
import { formatDateToIsraelLocale } from "@/utils/dateUtils";
import { useAuth } from "@/context/authContext";
interface AppointmentModalProps {
  appointment: Appointment | null;
  open: boolean;
  onClose: () => void;
  onEdit?: (appointment: Appointment) => void;
  onDelete?: (appointmentId: number) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  appointment,
  open,
  onClose,
  onEdit,
  onDelete,
}) => {
  const { user } = useAuth();

  const canModifyAppointment = useMemo(
    () => user?.id === appointment?.customerId,
    [user?.id, appointment?.customerId]
  );
  if (!appointment) return null;

  const handleEdit = () => {
    onEdit?.(appointment);
    onClose();
  };

  const handleDelete = () => {
    onDelete?.(appointment.id);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: 2,
          background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CalendarTodayIcon sx={{ fontSize: 32, color: "primary.main" }} />
          <Typography variant="h4" color="primary.main" fontWeight="bold">
            Appointment Details
          </Typography>
        </Box>
        {canModifyAppointment && (
          <Box>
            <IconButton
              onClick={handleEdit}
              sx={{ color: "primary.main", mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete} sx={{ color: "error.main" }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PetsIcon color="primary" />
            <Typography variant="h5" fontWeight="bold">
              {appointment.petName}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon color="action" fontSize="small" />
              <Typography>{appointment.customerName || "N/A"}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarTodayIcon color="action" fontSize="small" />
              <Typography>
                {formatDateToIsraelLocale(appointment.appointmentTime)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTimeIcon color="action" fontSize="small" />
              <Typography>
                Duration: {appointment.groomingDuration} minutes
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <StraightenIcon color="action" fontSize="small" />
              <Typography>
                Created: {formatDateToIsraelLocale(appointment.createdAt)}
              </Typography>
            </Box>

            <Chip
              label={appointment.petSize}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ alignSelf: "flex-start", mt: 1 }}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, bgcolor: "grey.50" }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{
            px: 4,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentModal;
