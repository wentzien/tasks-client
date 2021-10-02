import {useRoutes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {CssBaseline, ThemeProvider} from "@mui/material";
import useScrollReset from "./hooks/useScrollReset";
import routes from "./pages/routes";
import {createCustomTheme} from "./theme";

function App() {
    const content = useRoutes(routes);
    const themeColor = localStorage.getItem("theme") === "DARK" ? "DARK" : localStorage.getItem("theme") === "LIGHT" ? "LIGHT" : "LIGHT";

    useScrollReset();

    const theme = createCustomTheme({
        direction: "rtl",
        responsiveFontSizes: true,
        roundedCorners: true,
        theme: themeColor
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
