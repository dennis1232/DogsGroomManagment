import { CircularProgress, Typography, Container } from "@mui/material";

interface LoadingProps {
  size?: number;
  message?: string;
}

const Loading = ({ size = 60, message = "Loading..." }: LoadingProps) => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress size={size} />
      <Typography variant="h6" color="textSecondary">
        {message}
      </Typography>
    </Container>
  );
};

export default Loading;
