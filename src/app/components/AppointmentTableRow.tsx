import { Appointment } from "@/models/Appointment";
import { TableRow, TableCell } from "@mui/material";
import { flexRender, Row } from "@tanstack/react-table";

interface AppointmentTableRowProps {
  row: Row<Appointment>;
  index: number;
  onRowClick: (appointment: Appointment) => void;
}

const AppointmentTableRow: React.FC<AppointmentTableRowProps> = ({
  row,
  index,
  onRowClick,
}) => {
  return (
    <TableRow
      sx={{
        backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc",
        "&:hover": { backgroundColor: "#f1f5f9" },
        transition: "background-color 0.2s ease",
        cursor: "pointer",
      }}
      onClick={() => onRowClick(row.original)}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          sx={{
            textAlign: "center",
            padding: "12px 8px",
            color: "#334155",
            fontWeight: 500,
            borderRight: "1px solid #e2e8f0",
            borderBottom: "1px solid #e2e8f0",
            "&:last-child": { borderRight: "none" },
            ...(cell.column.id === "actions" && { width: "120px" }),
            ...(cell.column.id === "duration" && { width: "100px" }),
          }}
        >
          {cell.column.id === "actions" ? (
            <div className="flex justify-center gap-2">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ) : (
            flexRender(cell.column.columnDef.cell, cell.getContext())
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default AppointmentTableRow;
