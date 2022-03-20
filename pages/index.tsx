import type { NextPage } from "next";
import { Box, Code, Container, Grid, Text, Group } from "@mantine/core";
import EvalBox from "../components/EvalBox";
import SystemInfo from "../components/SystemInfo";
import ComControls from "../components/ComControls";
import { useEffect, useState } from "react";
const Home: NextPage = () => {
  const [version, setVersion] = useState<string>();
  useEffect(() => {
    async function run() {
      if (process.env.NODE_ENV == "development") {
        setVersion("DEV");
      } else {
        const response = await fetch("api/has-new-deploy");
        setVersion(String((await response.json()).version).slice(0, 7));
      }
    }
    run();
  });
  return (
    <>
      <Container size="lg">
        <Box sx={{ height: "90vh" }}>
          <h1>Cryptoid Gui</h1>
          <Grid gutter="md">
            <Grid.Col span={5}>
              <SystemInfo />
            </Grid.Col>
            <Grid.Col span={6}>
              <EvalBox />
            </Grid.Col>
            <Grid.Col span={5}>
              <ComControls />
            </Grid.Col>
          </Grid>
        </Box>
        <Group>
          {version == "DEV" && (
            <Text>
              Build: <Code>{version}</Code>
            </Text>
          )}
          {version != "DEV" && (
            <Text>
              Build:{" "}
              <a
                href={
                  "https://github.com/LeedsRaspJam/Cryptoid-Gui/commit/" +
                  version
                }
                target="_blank"
                rel="noreferrer"
              >
                <Code color="cyan">{version}</Code>
              </a>
            </Text>
          )}
        </Group>
      </Container>
    </>
  );
};

export default Home;
