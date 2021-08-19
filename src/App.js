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

import Login from "./pages/accounts/login";
import Logout from "./pages/accounts/logout";
import Register from "./pages/accounts/register";
import tasklistOverview from "./pages/tasklists/tasklistOverview";

function App() {
    return (
        <Router>
            <NavBar/>
            <main className="container">
                <Switch>
                    <Route exact path="/" component={tasklistOverview}></Route>
                    <Route exact path="/tasklists" component={tasklistOverview}></Route>
                    <Route exact path="/accounts/login" component={Login}></Route>
                    <Route exact path="/accounts/logout" component={Logout}></Route>
                    <Route exact path="/accounts/register" component={Register}></Route>
                    <Route exact path="/*">
                        <Redirect to="/404"/>
                    </Route>
                </Switch>
            </main>
        </Router>
    );
}

export default App;
