// src/features/LandingPage/index.tsx
import { Box, Typography, Paper } from "@mui/material";
import { styles } from "./styles";
import LoginButton from "@/components/LoginButton"; // Ensure this is correctly imported

const LandingPage = () => {
  return (
    <Box sx={styles.root}>
      <Paper sx={styles.card}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to your own Task Manager
        </Typography>
        <LoginButton />
      </Paper>
    </Box>
  );
};

export default LandingPage;
