import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useCallback,
} from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import { User } from "@/models/User";
import { ToastMessages } from "@/lib/constants";
import {
  createAppointment,
  getAvailableTimes,
  updateAppointment,
} from "../services/appointment";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { Appointment } from "@/models/Appointment";

interface AppointmentFormProps {
  user: User;
  appointment?: Appointment;
}

interface AppointmentFormData {
  customerName: string;
  petName: string;
  petSize: string;
  appointmentDate: string;
  appointmentTime: string;
  groomingDuration: number;
}

interface FormErrors {
  petName?: string;
  petSize?: string;
  appointmentDate?: string;
  appointmentTime?: string;
}

const groomingDurations: Record<string, number> = {
  Small: 30,
  Medium: 60,
  Large: 90,
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  user,
  appointment,
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    customerName: user?.fullName || "",
    petName: appointment?.petName || "",
    petSize: appointment?.petSize || "",
    appointmentDate: appointment?.appointmentTime
      ? new Date(appointment.appointmentTime).toISOString().split("T")[0]
      : "",
    appointmentTime: appointment ? appointment.appointmentTime.toString() : "",
    groomingDuration: appointment ? groomingDurations[appointment.petSize] : 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [availableTimes, setAvailableTimes] = useState<Date[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { showSuccess, showError } = useToast();

  const fetchAvailableTimes = useCallback(async () => {
    try {
      const appointmentDate = new Date(formData.appointmentDate);

      const response: Date[] = await getAvailableTimes(
        appointmentDate,
        formData.groomingDuration
      );
      setAvailableTimes(response);
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  }, [formData.appointmentDate, formData.groomingDuration]);

  useEffect(() => {
    if (formData.appointmentDate && formData.groomingDuration) {
      fetchAvailableTimes();
    }
  }, [
    fetchAvailableTimes,
    formData.appointmentDate,
    formData.groomingDuration,
  ]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.petName.trim()) {
      newErrors.petName = "Pet name is required";
    } else if (formData.petName.length < 2) {
      newErrors.petName = "Pet name must be at least 2 characters";
    }

    if (!formData.petSize) {
      newErrors.petSize = "Please select a pet size";
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = "Please select a date";
    } else {
      const selectedDate = new Date(formData.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.appointmentDate = "Please select a future date";
      }
    }

    if (!formData.appointmentTime) {
      newErrors.appointmentTime = "Please select an appointment time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    const updatedData: Partial<AppointmentFormData> = {
      [name!]: value as string,
    };

    if (name === "petSize") {
      updatedData.groomingDuration = groomingDurations[value as string] || 0;
      updatedData.appointmentTime = "";
    }

    setFormData((prev) => ({ ...prev, ...updatedData }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const appointmentData = {
        appointmentTime: new Date(formData.appointmentTime),
        duration: formData.groomingDuration,
        petSize: formData.petSize,
        petName: formData.petName,
      };

      if (appointment) {
        await updateAppointment(appointment.id, appointmentData);
        showSuccess(ToastMessages.appointmentUpdated);
      } else {
        await createAppointment(appointmentData);
        showSuccess(ToastMessages.appointmentCreated);
      }

      router.push("/appointments/me");
    } catch (error) {
      console.error("Appointment operation failed:", error);
      showError(ToastMessages.appointmentCreationFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Customer Name"
        name="customerName"
        value={formData.customerName}
        onChange={handleInputChange}
        fullWidth
        disabled
        margin="normal"
      />

      <TextField
        label="Pet Name"
        name="petName"
        value={formData.petName}
        onChange={handleInputChange}
        fullWidth
        required
        error={!!errors.petName}
        helperText={errors.petName}
        margin="normal"
      />

      <FormControl fullWidth error={!!errors.petSize} margin="normal">
        <InputLabel id="pet-size-label">Pet Size</InputLabel>
        <Select
          labelId="pet-size-label"
          name="petSize"
          value={formData.petSize}
          onChange={handleInputChange}
          required
        >
          <MenuItem value="Small">Small (30 min)</MenuItem>
          <MenuItem value="Medium">Medium (60 min)</MenuItem>
          <MenuItem value="Large">Large (90 min)</MenuItem>
        </Select>
        {errors.petSize && <FormHelperText>{errors.petSize}</FormHelperText>}
      </FormControl>

      <TextField
        label="Appointment Date"
        type="date"
        name="appointmentDate"
        value={formData.appointmentDate}
        onChange={handleInputChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        required
        error={!!errors.appointmentDate}
        helperText={errors.appointmentDate}
        margin="normal"
        inputProps={{
          min: new Date().toISOString().split("T")[0],
        }}
      />
      {(!formData.appointmentDate || !formData.petSize) && (
        <FormHelperText>
          Please select both a date and pet size to see available appointment
          times
        </FormHelperText>
      )}
      <FormControl fullWidth error={!!errors.appointmentTime} margin="normal">
        <InputLabel id="appointment-time-label">Appointment Time</InputLabel>
        <Select
          disabled={!availableTimes || !availableTimes.length}
          labelId="appointment-time-label"
          name="appointmentTime"
          value={formData.appointmentTime}
          onChange={handleInputChange}
          required
        >
          {availableTimes?.map((time) => (
            <MenuItem key={time.toString()} value={time.toString()}>
              {new Date(time).toLocaleTimeString()}
            </MenuItem>
          ))}
        </Select>
        {errors.appointmentTime && (
          <FormHelperText>{errors.appointmentTime}</FormHelperText>
        )}
        {!availableTimes ||
          (!availableTimes.length && formData.appointmentDate && (
            <FormHelperText>
              No available times for selected date
            </FormHelperText>
          ))}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting
          ? appointment
            ? "Updating..."
            : "Booking..."
          : appointment
          ? "Update Appointment"
          : "Book Appointment"}
      </Button>
    </form>
  );
};

export default AppointmentForm;
