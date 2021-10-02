import "@fontsource/roboto";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import "nprogress/nprogress.css";
import {StrictMode} from "react";
import ReactDOM from "react-dom";
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter} from "react-router-dom";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import {AuthProvider} from "./contexts/AuthContext";
import App from "./App";

ReactDOM.render(
    <StrictMode>
        <HelmetProvider>
            <StyledEngineProvider>
                <BrowserRouter>
                    <AuthProvider>
                        <App/>
                    </AuthProvider>
                </BrowserRouter>
            </StyledEngineProvider>
        </HelmetProvider>
    </StrictMode>,
    document.getElementById("root")
);
