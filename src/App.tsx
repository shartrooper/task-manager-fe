import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./features/LandingPage";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "./lib/axios";
import LogoutButton from "./components/LogoutButton";

const theme = createTheme({
  // https://mui.com/material-ui/customization/theming/
});

function MainPageWrapper() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const setAccessToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setupAxiosInterceptors(accessToken);
    };

    if (isAuthenticated) {
      setAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <div>
      {!isAuthenticated ? (
        <LandingPage />
      ) : (
        <div>
          <LogoutButton />
        </div>
      )}
    </div>
  );
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
              audience: "https://dev-gu6rg0laqfjlfgx5.us.auth0.com/api/v2/",
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
