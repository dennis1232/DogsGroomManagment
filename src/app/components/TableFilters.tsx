import { Grid, TextField, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface TableFiltersProps {
  globalFilter: string;
  dateFilter: { start: string; end: string };
  onGlobalFilterChange: (value: string) => void;
  onDateFilterChange: (type: "start" | "end", value: string) => void;
  onResetFilters: () => void;
}

const TableFilters: React.FC<TableFiltersProps> = ({
  globalFilter,
  dateFilter,
  onGlobalFilterChange,
  onDateFilterChange,
  onResetFilters,
}) => {
  return (
    <Grid container spacing={3} className="mb-6">
      <Grid item xs={12} md={3}>
        <TextField
          label="Filter by Name"
          variant="outlined"
          fullWidth
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={dateFilter.start}
          onChange={(e) => onDateFilterChange("start", e.target.value)}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          label="End Date"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={dateFilter.end}
          onChange={(e) => onDateFilterChange("end", e.target.value)}
        />
      </Grid>
      <Grid item md={3} xs={6}>
        <Button
          variant="outlined"
          onClick={onResetFilters}
          startIcon={<RefreshIcon />}
          sx={{ height: "100%" }}
        >
          Reset Filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default TableFilters;
