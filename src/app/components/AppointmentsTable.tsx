import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnDef,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Appointment } from "@/models/Appointment";
import AppointmentModal from "./AppointmentModal";
import { formatDateToIsraelLocale } from "@/utils/dateUtils";
import TableFilters from "./TableFilters";
import AppointmentTableHeader from "./AppointmentTableHeader";
import AppointmentTableRow from "./AppointmentTableRow";

interface AppointmentsTableProps {
  appointments: Appointment[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  appointments,
  onDelete,
  onEdit,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const filteredData = useMemo(() => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointmentTime).getTime();
      const startDate = dateFilter.start
        ? new Date(dateFilter.start).getTime()
        : null;
      const endDate = dateFilter.end
        ? new Date(dateFilter.end).getTime()
        : null;

      const isWithinDateRange =
        (!startDate || appointmentDate >= startDate) &&
        (!endDate || appointmentDate <= endDate);

      const matchesGlobalFilter = appointment?.customerName
        ?.toLowerCase()
        .includes(globalFilter.toLowerCase());

      return isWithinDateRange && matchesGlobalFilter;
    });
  }, [appointments, dateFilter, globalFilter]);

  const columns = useMemo<ColumnDef<Appointment>[]>(
    () => [
      {
        accessorKey: "customerName",
        header: "Customer Name",
        sortingFn: "alphanumeric",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "petName",
        header: "Pet Name",
        sortingFn: "alphanumeric",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "appointmentTime",
        header: "Date",
        sortingFn: "datetime",
        cell: (info) => {
          const fullDate = formatDateToIsraelLocale(info.getValue() as string);
          return fullDate.split(",")[0];
        },
      },
      {
        accessorKey: "appointmentTime",
        header: "Time",
        sortingFn: "datetime",
        cell: (info) => {
          const fullDate = formatDateToIsraelLocale(info.getValue() as string);
          return fullDate.split(",")[1].trim();
        },
      },
      {
        accessorKey: "groomingDuration",
        header: "Duration (min)",
        sortingFn: "alphanumeric",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Paper className="p-6 bg-white shadow-lg rounded-lg">
      <TableFilters
        globalFilter={globalFilter}
        dateFilter={dateFilter}
        onGlobalFilterChange={setGlobalFilter}
        onDateFilterChange={(type, value) =>
          setDateFilter((prev) => ({ ...prev, [type]: value }))
        }
        onResetFilters={() => {
          setGlobalFilter("");
          setDateFilter({ start: "", end: "" });
        }}
      />

      <TableContainer className="mb-4 border rounded-lg">
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <AppointmentTableHeader
                key={headerGroup.id}
                headerGroup={headerGroup}
              />
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  sx={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "#64748b",
                  }}
                >
                  No appointments found
                </TableCell>
              </TableRow>
            ) : (
              table
                .getRowModel()
                .rows.map((row, index) => (
                  <AppointmentTableRow
                    key={row.id}
                    row={row}
                    index={index}
                    onRowClick={handleRowClick}
                  />
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredData.length}
        page={pagination.pageIndex}
        rowsPerPage={pagination.pageSize}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onPageChange={(event, newPage) =>
          setPagination((prev) => ({ ...prev, pageIndex: newPage }))
        }
        onRowsPerPageChange={(event) =>
          setPagination((prev) => ({
            ...prev,
            pageSize: parseInt(event.target.value, 10),
          }))
        }
        sx={{
          ".MuiTablePagination-select": {
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          },
          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
            {
              color: "#475569",
              fontWeight: 500,
            },
        }}
      />
      <AppointmentModal
        appointment={selectedAppointment}
        open={isModalOpen}
        onEdit={() => onEdit(selectedAppointment?.id ?? 0)}
        onDelete={() => onDelete(selectedAppointment?.id ?? 0)}
        onClose={handleModalClose}
      />
    </Paper>
  );
};

export default AppointmentsTable;
