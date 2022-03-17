import { Box, Typography, Grid, Paper } from "@mui/material";
import type { NextPage } from "next";
import EvalBox from "../components/EvalBox";
import SystemInfo from "../components/SystemInfo";

const Home: NextPage = () => {
  return (
    <Box sx={{ m: 2 }}>
      <Paper sx={{ height: "90vh", p: 2 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Cryptoid Gui
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <SystemInfo />
          </Grid>
          <Grid item>
            <EvalBox />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Home;