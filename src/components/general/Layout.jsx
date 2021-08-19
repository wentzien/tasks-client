import {BrowserRouter as Router} from "react-router-dom";
import NavBar from "./NavBar";
import Pages from "../../pages/Pages";

import "../../styles/normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/globals.css";

const Layout = () => {
    return (
        <Router>
            <NavBar/>
            <main className="container">
                <Pages/>
            </main>
        </Router>
    );
};

export default Layout;
