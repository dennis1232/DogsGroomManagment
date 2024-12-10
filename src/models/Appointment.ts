export type Appointment = {
  id: number;
  customerId: number;
  petName: string;
  petSize: string;
  appointmentTime: string; // DateTime will be received as ISO string
  groomingDuration: number;
  customerName?: string;
  createdAt: string; // DateTime will be received as ISO string
};
