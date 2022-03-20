import type { NextPage } from "next";
import { Box, Container, Grid, Paper } from "@mantine/core";
import EvalBox from "../components/EvalBox";
import SystemInfo from "../components/SystemInfo";
import ComControls from "../components/ComControls";

const Home: NextPage = () => {
  return (
    <Container size="lg">
      <h2>Cryptoid Gui</h2>
      <Grid gutter="md">
        <Grid.Col span={5}>
          <SystemInfo />
        </Grid.Col>
        <Grid.Col sx={{ maxWidth: 500 }} span={5}>
          <EvalBox />
        </Grid.Col>
        <Grid.Col span={5}>
          <ComControls />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Home;
