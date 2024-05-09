import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./features/LandingPage";
import { useEffect } from "react";
import Dashboard from "./features/Dashboard";

const theme = createTheme({
  // https://mui.com/material-ui/customization/theming/
});

function MainPageWrapper() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const setAccessToken = async () => {
      const accessToken = await getAccessTokenSilently();
      localStorage.setItem("auth-token", accessToken);
    };

    if (isAuthenticated) {
      setAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return <div>{!isAuthenticated ? <LandingPage /> : <Dashboard />}</div>;
}

function App() {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
              redirect_uri: window.location.origin,
              audience: "nestjs-api",
            }}
          >
            <MainPageWrapper />
          </Auth0Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}
export default App;
