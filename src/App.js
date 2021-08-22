import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import useScrollReset from "./hooks/useScrollReset";
import routes from "./pages/routes";
import { createCustomTheme } from "./theme";

function App() {
    const content = useRoutes(routes);

    useScrollReset();

    const theme = createCustomTheme({
        direction: "rtl",
        responsiveFontSizes: true,
        roundedCorners: true,
        theme: "LIGHT"
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Toaster position="top-center"/>
            {content}
        </ThemeProvider>
    );
}

export default App;
