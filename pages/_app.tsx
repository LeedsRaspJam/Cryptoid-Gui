import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import type { AppProps } from "next/app";
import { theme } from "../lib/theme";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} withGlobalStyles>
      <ModalsProvider>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default MyApp;
