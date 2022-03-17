import { Box, Typography, Grid } from "@mui/material";
import type { NextPage } from "next";
import SystemInfo from "../components/SystemInfo";

const Home: NextPage = () => {
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4">Cryptoid Gui</Typography>
      <Grid container spacing={2}>
        <Grid item>
          <SystemInfo />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
