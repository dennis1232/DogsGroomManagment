export const APIEndpoints = {
  login: "/customers/login",
  register: "/customers/register",
  userDetails: "/customers/me",
  availableTimes: "/appointments/available-times",
  createAppointment: "/appointments/create",
  myAppointments: "/appointments/me",
  appointments: "/appointments",
  cancelAppointment: "/appointments/cancel",
};

export const ToastMessages = {
  // Authentication Messages
  loginSuccess: "Welcome back! You have logged in successfully.",
  loginFailure: "Login failed. Please check your username and password.",
  logoutSuccess: "You have logged out successfully.",

  // Registration Messages
  registrationSuccess: "Account created successfully! Please log in.",
  registrationFailure: "Registration failed. Username may already be in use.",

  // Appointment Messages
  appointmentCreated: "Appointment booked successfully!",
  appointmentCreationFailed:
    "Failed to book the appointment. Please try again.",
  appointmentUpdated: "Appointment updated successfully!",
  appointmentUpdateFailed:
    "Failed to update the appointment. Please try again.",
  appointmentDeleted: "Appointment canceled successfully!",
  appointmentDeletionFailed:
    "Failed to cancel the appointment. Please try again.",
  fetchAppointmentsFailed:
    "Failed to fetch appointments. Please refresh the page.",

  // Customer Messages
  fetchCustomersFailed: "Failed to fetch customer data. Please try again.",
  customerNotFound: "Customer not found.",

  // General Messages
  actionSuccess: "Action completed successfully!",
  actionFailed: "Something went wrong. Please try again.",

  // Miscellaneous
  unauthorizedAccess: "You are not authorized to perform this action.",
  unexpectedError: "An unexpected error occurred. Please try again later.",
};
