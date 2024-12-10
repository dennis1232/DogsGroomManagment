import { Appointment } from "@/models/Appointment";
import { TableRow, TableCell } from "@mui/material";
import { flexRender, HeaderGroup } from "@tanstack/react-table";

interface AppointmentTableHeaderProps {
  headerGroup: HeaderGroup<Appointment>;
}

const AppointmentTableHeader: React.FC<AppointmentTableHeaderProps> = ({
  headerGroup,
}) => {
  return (
    <TableRow>
      {headerGroup.headers.map((header) => (
        <TableCell
          key={header.id}
          onClick={
            header.column.getCanSort()
              ? header.column.getToggleSortingHandler()
              : undefined
          }
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: 600,
            textAlign: "center",
            padding: "16px 8px",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            "&:last-child": { borderRight: "none" },
            ":hover": header.column.getCanSort()
              ? {
                  cursor: "pointer",
                  backgroundColor: "#334155",
                }
              : undefined,
          }}
        >
          <div className="flex items-center justify-center gap-2">
            {flexRender(header.column.columnDef.header, header.getContext())}
            {header.column.getCanSort() &&
              {
                asc: " ↑",
                desc: " ↓",
              }[header.column.getIsSorted() as string]}
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
};

export default AppointmentTableHeader;
