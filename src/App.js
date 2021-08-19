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
import TasklistOverview from "./pages/tasklists/TasklistOverview";
import TasklistView from "./pages/tasklists/TasklistView";

function App() {
    return (
        <Router>
            <NavBar/>
            <main className="container">
                <Switch>
                    <Route exact path="/" component={TasklistOverview}></Route>
                    <Route exact path="/tasklists" component={TasklistOverview}></Route>
                    <Route exact path="/tasklists/:tasklistId" component={TasklistView}></Route>
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
