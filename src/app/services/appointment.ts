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
    const appointmentData = {
      ...data,
      appointmentTime: new Date(data.appointmentTime).toISOString(),
    };

    const response = await axiosInstance.post(
      APIEndpoints.createAppointment,
      appointmentData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAvailableTimes = async (date: Date, duration: number) => {
  try {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    );

    const response = await axiosInstance.get(APIEndpoints.availableTimes, {
      params: {
        date: utcDate.toISOString(),
        duration,
      },
    });

    // Response times are in UTC, convert to local timezone for display
    return response.data.map((time: string) => new Date(time));
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
