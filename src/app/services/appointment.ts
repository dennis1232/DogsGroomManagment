import axiosInstance from "@/lib/axiosInstance";
import { APIEndpoints } from "@/lib/constants";

export interface CreateAppointmentRequest {
  appointmentTime: Date;
  duration: number;
  petSize: string;
  petName: string;
}

export const createAppointment = async (data: CreateAppointmentRequest) => {
  try {
    const response = await axiosInstance.post(
      APIEndpoints.createAppointment,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAvailableTimes = async (date: string, duration: number) => {
  try {
    const response = await axiosInstance.get(APIEndpoints.availableTimes, {
      params: { date, duration },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomerAppointments = async () => {
  try {
    const response = await axiosInstance.get(APIEndpoints.myAppointments);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export interface GetAppointmentsParams {
  fromDate?: string;
  toDate?: string;
}

export const getAppointments = async (params?: GetAppointmentsParams) => {
  try {
    const response = await axiosInstance.get(APIEndpoints.appointments, {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelAppointment = async (appointmentId: number) => {
  try {
    const response = await axiosInstance.delete(
      `${APIEndpoints.appointments}/${appointmentId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAppointment = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `${APIEndpoints.appointments}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAppointment = async (
  id: number,
  data: CreateAppointmentRequest
) => {
  try {
    const response = await axiosInstance.put(
      `${APIEndpoints.appointments}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
