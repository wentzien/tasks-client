import {
    Switch,
    Route,
    Redirect,
    BrowserRouter as Router
} from "react-router-dom";

import "./styles/normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/globals.css";

import NavBar from "./components/general/NavBar";

import Login from "./pages/login";
import Logout from "./pages/logout";
import Register from "./pages/register";
import Tasklist from "./pages/tasklist";

function App() {
    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Tasklist}></Route>
                <Route exact path="/tasklists" component={Tasklist}></Route>
                <Route exact path="/accounts/login" component={Login}></Route>
                <Route exact path="/accounts/logout" component={Logout}></Route>
                <Route exact path="/accounts/register" component={Register}></Route>
                <Route exact path="/*">
                    <Redirect to="/404"/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
