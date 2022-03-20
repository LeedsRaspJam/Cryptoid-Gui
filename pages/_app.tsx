import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { theme } from "../lib/theme";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} withGlobalStyles>
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
